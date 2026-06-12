# Employee Registration Wizard UI Revamp

## Goal Description

Transform the existing multi‑step employee registration wizard into a polished, production‑ready UI suitable for a real HR management system. The new design must leverage Tailwind CSS for styling, be fully responsive, include a step indicator and progress bar, use card‑styled forms, provide smooth transitions, and maintain a consistent visual language across all steps and the review page.

## User Review Required

> [!IMPORTANT]
> The design will adopt a new color palette and typography (Inter font). If you have a brand‑specific palette or font preferences, please let me know before proceeding.

## Open Questions

> [!QUESTION]
> 1. Preferred primary accent color (e.g., teal, indigo, emerald)?
> 2. Should the progress bar be linear at the top or circular around the step indicator?
> 3. Do you want dark‑mode support?

## Proposed Changes

---
### EmployeeWizard.jsx
- Refactor to include a **StepIndicator** component showing steps: Personal → Address → Employment → Review.
- Add a **ProgressBar** component that reflects current step percentage.
- Wrap each step component inside a **Card** container with Tailwind utility classes for spacing, shadows, and rounded corners.
- Use `framer-motion`‑style CSS transitions (`transition-opacity`, `duration-300`) for step changes.
- Pass `formData`, `handleChange`, and `errors` props unchanged.
- Update navigation handlers to trigger smooth fade‑in/out.
- Import Tailwind base styles and the **Inter** Google Font.

---
### PersonalDetails.jsx, AddressDetails.jsx, EmploymentDetails.jsx
- Convert each to a **FormCard** component:
  - Outer `<div className="p-6 space-y-4">` wrapped by `<div className="bg-white rounded-xl shadow-lg border border-gray-200">`.
  - Use Tailwind grid (`grid grid-cols-1 md:grid-cols-2 gap-4`) for responsive layout.
  - Apply consistent label/input classes:
    - `className="block text-sm font-medium text-gray-700"` for labels.
    - `className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"` for inputs.
  - Show validation errors with `text-sm text-red-600 mt-1` under each field.
  - Add **Next** and **Previous** buttons styled uniformly:
    - Primary: `bg-indigo-600 text-white hover:bg-indigo-700`.
    - Secondary: `bg-gray-200 text-gray-800 hover:bg-gray-300`.
- Ensure all inputs have `name` attributes matching the `formData` keys.
- Remove any legacy button markup.

---
### ReviewSubmit.jsx
- Redesign as a **ReviewCard** with sections:
  - Personal Details, Address Details, Employment Details.
  - Each section renders a two‑column description list (`<dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">`).
  - Use subtle background (`bg-gray-50`) and rounded borders for each section.
- Add a **Submit** button (`bg-green-600 hover:bg-green-700`) and a **Previous** button.
- On click, call a `handleSubmit` that logs `formData` to console, shows a success toast using `react-hot-toast`, and optionally resets wizard state.
- Include a success message component with animation (`transition`, `opacity-0 → opacity-100`).

---
### EmployeeActions.jsx (if used)
- Replace existing button group with a shared **WizardButton** component to ensure consistent styling across steps.

---
### Global Styling
- Install Tailwind CSS (if not already) and configure `tailwind.config.js` to include `./src/**/*.{js,jsx,ts,tsx}`.
- Import Tailwind base in `src/index.css`:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- Add Google Font import in `index.html` head:
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  ```
- Set `body { font-family: 'Inter', sans-serif; }` in CSS.

---
### Verification Plan

**Automated Tests**
- Run `npm run dev` and ensure no compile errors.
- Verify that navigation works and validation prevents progressing.
- Snapshot test the rendered HTML of each step (optional).

**Manual Verification**
- Open the app in Chrome and test on desktop, tablet, and mobile breakpoints.
- Confirm step indicator and progress bar reflect current step.
- Validate that error messages appear correctly.
- Submit the form and check console output and success toast.
- Review visual polish: spacing, shadows, button states, typography.

---
## Timeline
- Update Tailwind setup and global styles: 0.5 h
- Refactor Wizard container and navigation: 1 h
- Redesign each step component (Personal, Address, Employment): 2 h
- Redesign ReviewSubmit page: 1 h
- Create reusable UI components (Card, Button, StepIndicator, ProgressBar): 1 h
- Testing and polishing: 1 h

**Total estimated time:** ~6.5 hours.

---
**Next Steps**
- Await user confirmation on color palette, progress bar style, and dark‑mode preference.
- Upon approval, create the required UI components and update existing files accordingly.
