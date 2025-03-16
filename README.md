# Formula Input UI

A **React-based formula input component** inspired by **Causal.app**, featuring an interactive input field with **tag-based selections, autocomplete suggestions, and mathematical calculations**. Built using **React, Zustand, React Query, and Math.js**.

## 🚀 Features
- **Hybrid Input System**: Supports manual input of numbers and operators.
- **Autocomplete Suggestions**: Fetches options from an API and inserts them as tags.
- **Tag-Based Formula Building**: Allows selecting tags and assigning values dynamically.
- **Operators Support**: Handles `+ - * / ^ ( )` between tags.
- **Customizable Period Multipliers**: Assigns different time periods (e.g., `1 year`, `3 months`) to suggestion tags.
- **Dynamic Calculation**: Uses `math.js` to evaluate formulas with both manual input and selected tags.
- **Backspace Support**: Removes the last added element when pressing backspace.

## 🛠️ Tech Stack
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Zustand** - State management
- **React Query** - API data fetching and caching
- **Math.js** - Mathematical evaluation
- **SCSS Modules** - Styling

## 📦 Installation & Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Khanim98/calculate-formula.git
   cd formula-input-ui
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. **Visit in browser:**
   ```
   http://localhost:5173
   ```
   (assuming Vite is used as the bundler)

## 🏗️ Project Structure
```
formula-input-ui/
│── src/
│   ├── api/                # API hooks (React Query)
│   │   ├── suggestions/    # useGetSuggestions hook
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx  # Custom button component
│   │   │   ├── Input.tsx   # Input component
│   │   │   ├── Tag.tsx     # Tag component
│   │   │   ├── Dropdown.tsx# Dropdown component
│   ├── store/              # Zustand store
│   ├── constants/          # Period multipliers
│   ├── types/              # TypeScript type definitions
│   ├── styles/             # SCSS module styles
│   ├── App.tsx             # Main app component
│── public/
│── package.json
│── vite.config.ts
│── tsconfig.json
│── README.md               # Project documentation
```

## 🔥 Usage
### Entering Formulas
- Start typing **numbers** or **operators** (`+ - * / ^ ( )`)
- Type a **word** to trigger autocomplete suggestions
- Select a suggestion to insert it as a **tag**
- Click on a tag to **change its associated time period**
- Press **Backspace** to remove the last tag or input

### Running Calculations
- Click the **Calculate** button to evaluate the formula
- The **result** will be displayed below the input field

## 🔗 API Integration
This project fetches suggestions dynamically from an API using **React Query**:
```ts
const { data: suggestions = [] } = useGetSuggestions(currentTag);
```
**API Endpoint:**
```
https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete
```

## 🏆 Contributions
Feel free to submit issues or pull requests to improve this project!

## 📝 License
MIT License © 2025 Khanim Pashayeva

