import { useState, useRef } from "react";
import styles from "./FormulaInput.module.scss";
import { evaluate } from "mathjs";
import { Input } from "../ui/input";
import { Tag } from "../ui/tag";
import { Dropdown, DropdownItem } from "../ui/dropdown";
import { PeriodOption } from "../../types/periodTypes";
import { Suggestion } from "../../types/suggestion";
import { periodOptions } from "../../constants/periodOfTime";
import { useFormulaStore } from "../../store/formulaStore";
import { useGetSuggestions } from "../../api/suggestions/queries";
import { Button } from "../ui/button";

export default function FormulaInput() {
  const tags = useFormulaStore((state) => state.tags);
  const setTags = useFormulaStore((state) => state.setTags);
  const [inputValue, setInputValue] = useState("");
  const [formulaResult, setFormulaResult] = useState<string | null>(null);
  const [activePeriodDropdown, setActivePeriodDropdown] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentTag = inputValue.split(/[^a-zA-Z]/).pop() || "";

  const { data: suggestions = [] } = useGetSuggestions(currentTag);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const selectSuggestion = (suggestion: Suggestion) => {
    const lastWordMatch = inputValue.match(/[a-zA-Z]+$/);
    const lastWord = lastWordMatch ? lastWordMatch[0] : "";
    
    const parts = inputValue.replace(lastWord, "").trim();
    
    setTags([
      ...tags,
      ...(parts ? [parts] : []),
      {
        suggestion,
        period: periodOptions[2],
      },
    ]);
    setInputValue("");
  };

  const setPeriodForTag = (tagIndex: number, period: PeriodOption) => {
    const updatedTags = tags.map((tag, idx) => {
      if (idx === tagIndex && typeof tag !== "string") {
        return { ...tag, period };
      }
      return tag;
    });
    setTags(updatedTags);
    setActivePeriodDropdown(null);
  };

  const calculateFormula = () => {
    let expression = tags
      .map((t) => {
        if (typeof t === "string") {
          return t;
        }
        const multipliedValue = t.suggestion?.value * t.period.multiplier;
        return multipliedValue ? multipliedValue.toString() : "0";
      })
      .join(" ");
    
    if (inputValue.trim()) {
      expression += ` ${inputValue.trim()}`;
    }

    try {
      const result = evaluate(expression);
      setFormulaResult(`${expression}\n= ${result}`);
    } catch (e) {
      setFormulaResult("Invalid Expression");
    }
  };

  return (
    <div className={styles.formulaWrapper}>
      <div className={styles.inputContainer}>
        {tags.map((tag, idx) =>
          typeof tag !== "string" ? (
            <span key={`tag-${tag.suggestion.id}-${idx}`} className={styles.selectedTag}>
              <Tag>{"#" + tag.suggestion.name}</Tag>
              <Tag variant={'subTag'} onClick={() => setActivePeriodDropdown(activePeriodDropdown === idx ? null : idx)}>
                {tag.period.label}
                {activePeriodDropdown === idx && (
                  <Dropdown className={styles.dropdown}>
                    {periodOptions.map((opt) => (
                      <DropdownItem
                        key={opt.label}
                        onClick={() => setPeriodForTag(idx, opt)}
                      >
                        {opt.label}
                      </DropdownItem>
                    ))}
                  </Dropdown>
                )}
              </Tag>
            </span>
          ) : (
            <span key={`operator-${idx}`}>{tag}</span>
          )
        )}
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={inputValue ? "+" : "="}
          className={styles.input}
        />
      </div>

      {suggestions.length > 0 && (
        <Dropdown className={styles.dropdown}>
          {suggestions.map((s, index) => (
            <DropdownItem key={index} onClick={() => selectSuggestion(s)}>
              {s.name}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
      <Button className={styles.calculateButton} onClick={calculateFormula}>
        Calculate
      </Button>
      {formulaResult && <div>Formula Result: {formulaResult}</div>}
    </div>
  );
}