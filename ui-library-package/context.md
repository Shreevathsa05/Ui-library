# UI Library Context

## Folder Structure
- **Root Directory:** `E:\ImpProjects\Ui-library\ui-library-package`
- **Components Directory:** `E:\ImpProjects\Ui-library\ui-library-package\components`
  - Subdirectories exist for categories like `buttons`, `carousel`, `menus`.
- **Main Export File:** `E:\ImpProjects\Ui-library\ui-library-package\index.js`
  - All new components must be exported from here.

## Technology Stack & Rules
- **Goal:** We are building an npm package for a UI library.
- **Framework:** React (JSX style).
- **Styling:** TailwindCSS.
- **Bundler:** Rollup (building via `npm run build` which runs `rollup -c`).
- **Dependencies:** No other dependencies allowed (only `react`, Rollup plugins, and Tailwind utilities).
- **Workflow:** 
  1. Create a single component in the `components` directory (or an appropriate subdirectory).
  2. Implement it using JSX and TailwindCSS.
  3. Write example usage for the component in the comments within the file.
  4. Export it in `index.js`.
  5. Build the package (`npm run build`) to ensure there are no bundling issues.
  6. Test the component and flag any mistakes.

## Design Rules
- **Theme:** Keep the light theme strictly minimal with shades of black and white. Use shadows to highlight the components
- **Colors:** Use only black, white, and shades of gray.
- **Fonts:** Use only system fonts.
- **Components:** Use only TailwindCSS classes.
- **No external dependencies:** Do not import any other libraries or packages.

## Past Mistakes & Lessons Learned (To Avoid)
1. **Generic Layouts vs. Premium UX Structure**: Initially building flat, single-box components without a distinct hierarchy. 
   - *Fix*: Use section separation with background shades (e.g., `bg-gray-50` for headers/footers, `bg-white` for bodies), proper borders (`border-b border-gray-200`), and zero-padding wrappers with `overflow-hidden` for a high-end "app-like" feel.
2. **Weak Component Borders**: Using thin borders (like `border-gray-100`) for the outer container made the component invisible on light backgrounds.
   - *Fix*: Rely on robust container styling like `border border-gray-300` coupled with premium diffused shadows (`shadow-[0_8px_30px_rgb(0,0,0,0.08)]`) to ensure it stands out.
3. **Inconsistent Component Widths**: Relying on intrinsic layout classes like `inline-flex` with `max-w-[320px] w-full`. This caused identical components (like DatePicker vs DateRangePicker) to shrink or expand variably depending on internal text length.
   - *Fix*: Lock the widths of structural elements using fixed utility classes (e.g., `w-[340px]`) when building paired or related components to guarantee 1:1 visual consistency.
4. **Mismatched Internal Grids/Spacing**: Using `gap-x-1` in one component but `gap-x-0` in another related component.
   - *Fix*: Maintain strict visual symmetry. Always reuse exact layout spacing (padding, grid gaps) across related elements in the UI library.
5. **Over-engineering with Higher-Order Patterns**: Initially wrapping the calendar in a popover input field when the core component was just the calendar itself.
   - *Fix*: Build the raw, inline component first unless explicitly asked to build a dropdown/popover wrapper.
