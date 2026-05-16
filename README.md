<div align="center">
  <h1>⚡ Functional UI</h1>
  <p>A premium, modular React UI library with a minimalist aesthetic.<br/>Built for speed, precision, and modern design principles.</p>
  
  <br/>
  
  [![npm version](https://img.shields.io/npm/v/functional-ui.svg?style=for-the-badge&color=black)](https://www.npmjs.com/package/functional-ui)
  [![License: MIT](https://img.shields.io/badge/License-MIT-black.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
</div>

<br/>
<br/>

## 🚀 Getting Started

**Functional UI** is designed to be frictionless. You can install it in modern React applications (via npm) or use it directly in the browser via a **CDN** `<script>` tag—no build step required.

<br/>

### 📦 Installation (React / npm)

For Next.js, Vite, or Create React App environments:

```bash
npm i functional-ui
```

*Note: Since Functional UI relies on TailwindCSS for styling, ensure Tailwind is configured in your project.*

<br/>

### 🌐 Full CDN Boilerplate (Browser / HTML)

You can drop Functional UI directly into any standard HTML file using a CDN. This is the fastest way to prototype or add complex UI to a legacy web page.

This requires React, ReactDOM, Babel (for JSX), Tailwind CSS, and the Functional UI library.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Functional UI - CDN Example</title>
  
  <!-- 1. Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- 2. React & ReactDOM -->
  <script crossorigin src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js"></script>
  
  <!-- 3. Babel -->
  <script src="https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js"></script>

  <!-- 4. Functional UI via CDN -->
  <script src="https://cdn.jsdelivr.net/npm/functional-ui/dist/index.umd.min.js"></script>
</head>
<body class="bg-gray-50 min-h-screen p-10">
  <div id="root"></div>

  <!-- Write your React code inside this text/babel block -->
  <script type="text/babel">
    const { BasicButton } = window.UiLibrarySpj;

    function App() {
      return (
        <BasicButton onClick={() => alert('Ready!')}>
          Hello World
        </BasicButton>
      );
    }

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>
```

<br/>
<br/>

---

## 🧩 All Components & Variations

Here is the complete catalog of all components available in Functional UI, complete with implementation examples for both modern **React** setups and **CDN** integration.

<br/>

### 1. Buttons Suite
Functional UI provides multiple button variations for different contexts.

**Available Components:** `BasicButton`, `ActionButton`, `ConfirmButton`, `SubmitButton`, `LinkButton`, `IconActionButton`

**React Usage:**
```jsx
import { 
  BasicButton, 
  ActionButton, 
  ConfirmButton, 
  SubmitButton,
  LinkButton,
  IconActionButton
} from 'functional-ui';

export default function ButtonGroup() {
  return (
    <div className="flex space-x-4">
      <BasicButton>Default</BasicButton>
      <ActionButton action={() => console.log('Action')}>Execute</ActionButton>
      <ConfirmButton onConfirm={() => console.log('Confirmed')}>Delete</ConfirmButton>
      <SubmitButton isSubmitting={false}>Submit</SubmitButton>
      <LinkButton href="/about">Learn More</LinkButton>
    </div>
  );
}
```

**CDN Usage:**
```html
<!-- Make sure functional-ui is loaded via CDN first -->
<script src="https://cdn.jsdelivr.net/npm/functional-ui/dist/index.umd.min.js"></script>

<script type="text/babel">
  const { BasicButton, ConfirmButton, ActionButton } = window.UiLibrarySpj;

  function App() {
    return (
      <div className="flex space-x-4">
        <BasicButton>Standard</BasicButton>
        <ConfirmButton onConfirm={() => alert('Confirmed')}>Action</ConfirmButton>
      </div>
    );
  }
</script>
```

<br/>

### 2. Smart Inputs & File Drops
Input fields engineered with built-in aesthetics, feedback, and structure.

**Available Components:** `SmartInput`, `SmartFileDrop`

**React Usage:**
```jsx
import { SmartInput, SmartFileDrop } from 'functional-ui';

export default function FormArea() {
  return (
    <div className="space-y-6 w-96">
      <SmartInput 
        label="Email Address" 
        placeholder="you@company.com" 
        type="email" 
      />
      <SmartFileDrop 
        onDrop={(files) => console.log(files)} 
        accept="image/*"
      />
    </div>
  );
}
```

**CDN Usage:**
```html
<script src="https://cdn.jsdelivr.net/npm/functional-ui/dist/index.umd.min.js"></script>

<script type="text/babel">
  const { SmartInput, SmartFileDrop } = window.UiLibrarySpj;

  function App() {
    return (
      <div className="max-w-md mx-auto space-y-4">
        <SmartInput label="Username" placeholder="@john" />
        <SmartFileDrop onDrop={(files) => console.log(files)} />
      </div>
    );
  }
</script>
```

<br/>

### 3. Auth Forms
Drop-in, elegant, conversion-optimized authentication forms.

**Available Components:** `SignInForm`, `RegisterForm`, `AuthForm`, `InputField`

**React Usage:**
```jsx
import { SignInForm, RegisterForm } from 'functional-ui';

export default function AuthPage() {
  return (
    <div className="grid grid-cols-2 gap-10">
      <SignInForm onSubmit={(data) => console.log('Login', data)} />
      <RegisterForm onSubmit={(data) => console.log('Register', data)} />
    </div>
  );
}
```

**CDN Usage:**
```html
<script src="https://cdn.jsdelivr.net/npm/functional-ui/dist/index.umd.min.js"></script>

<script type="text/babel">
  const { SignInForm } = window.UiLibrarySpj;

  function App() {
    return (
      <div className="flex justify-center p-10">
        <SignInForm onSubmit={(data) => alert('Submitted')} />
      </div>
    );
  }
</script>
```

<br/>

### 4. Modals Suite
A complete suite of overlays for every possible use case, using deep shadows and subtle borders.

**Available Components:** `CenteredModal`, `CardModal`, `ConfirmationModal`, `DeleteModal`, `SuccessModal`, `BadgeSuccessModal`

**React Usage:**
```jsx
import { 
  CenteredModal, 
  DeleteModal, 
  BadgeSuccessModal 
} from 'functional-ui';
import { useState } from 'react';

export default function ModalShowcase() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modals</button>
      
      {/* Examples (Toggle one at a time) */}
      <CenteredModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Modal Content</h2>
      </CenteredModal>
      
      <DeleteModal 
        isOpen={false} 
        onClose={() => {}} 
        onDelete={() => console.log('Deleted')} 
      />
      
      <BadgeSuccessModal 
        isOpen={false} 
        onClose={() => {}} 
        message="Account Created!" 
      />
    </>
  );
}
```

**CDN Usage:**
```html
<script src="https://cdn.jsdelivr.net/npm/functional-ui/dist/index.umd.min.js"></script>

<script type="text/babel">
  const { SuccessModal, DeleteModal, BasicButton } = window.UiLibrarySpj;

  function App() {
    const [openModal, setOpenModal] = React.useState(null);

    return (
      <div className="p-10 space-x-4">
        <BasicButton onClick={() => setOpenModal('success')}>
          Show Success
        </BasicButton>
        <BasicButton onClick={() => setOpenModal('delete')}>
          Show Delete
        </BasicButton>

        <SuccessModal 
          isOpen={openModal === 'success'} 
          onClose={() => setOpenModal(null)} 
        />
        
        <DeleteModal 
          isOpen={openModal === 'delete'} 
          onClose={() => setOpenModal(null)} 
          onDelete={() => setOpenModal(null)}
        />
      </div>
    );
  }
</script>
```

<br/>

### 5. Calendar & Dates
Strict, 1:1 scale date pickers that prevent layout shifts and look incredible.

**Available Components:** `ContextualDatePicker`, `ContextualDateRangePicker`

**React Usage:**
```jsx
import { ContextualDatePicker, ContextualDateRangePicker } from 'functional-ui';

export default function DateSelection() {
  return (
    <div className="space-y-6">
      <ContextualDatePicker 
        onChange={(date) => console.log(date)} 
      />
      <ContextualDateRangePicker 
        onChange={(range) => console.log(range)} 
      />
    </div>
  );
}
```

**CDN Usage:**
```html
<script src="https://cdn.jsdelivr.net/npm/functional-ui/dist/index.umd.min.js"></script>

<script type="text/babel">
  const { ContextualDateRangePicker } = window.UiLibrarySpj;

  function App() {
    return (
      <div className="p-20 flex justify-center bg-gray-50">
         <ContextualDateRangePicker onChange={(range) => console.log(range)} />
      </div>
    );
  }
</script>
```

<br/>

### 6. Loading Skeletons
Beautiful, shimmering placeholders designed to replicate complex data structures seamlessly.

**Available Components:** `Skeleton`, `CardSkeleton`, `ListSkeleton`, `ProfileSkeleton`, `TableSkeleton`

**React Usage:**
```jsx
import { 
  ProfileSkeleton, 
  TableSkeleton, 
  CardSkeleton 
} from 'functional-ui';

export default function LoadingStates() {
  return (
    <div className="space-y-10">
      <ProfileSkeleton />
      <div className="grid grid-cols-3 gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <TableSkeleton rows={5} columns={4} />
    </div>
  );
}
```

**CDN Usage:**
```html
<script src="https://cdn.jsdelivr.net/npm/functional-ui/dist/index.umd.min.js"></script>

<script type="text/babel">
  const { ListSkeleton } = window.UiLibrarySpj;

  function App() {
    return (
      <div className="max-w-xl mx-auto p-10">
        <ListSkeleton items={4} />
      </div>
    );
  }
</script>
```

<br/>

### 7. Document Management
High-end components for uploading, displaying, and managing files.

**Available Components:** `FileUpload`, `FileCard`, `FileList`, `FileTypeBadge`

**React Usage:**
```jsx
import { FileUpload, FileList, FileCard } from 'functional-ui';

export default function DocumentPortal() {
  return (
    <div className="space-y-8 max-w-2xl">
      <FileUpload onUpload={(file) => console.log(file)} />
      
      <FileList 
        files={[{ id: 1, name: 'Report.pdf', size: '2MB' }]} 
        onDelete={(id) => console.log(id)} 
      />
      
      <FileCard 
        file={{ name: 'image.png', type: 'image/png' }} 
        onRemove={() => {}} 
      />
    </div>
  );
}
```

**CDN Usage:**
```html
<script src="https://cdn.jsdelivr.net/npm/functional-ui/dist/index.umd.min.js"></script>

<script type="text/babel">
  const { FileUpload } = window.UiLibrarySpj;

  function App() {
    return (
      <div className="p-10 max-w-md">
         <FileUpload onUpload={(f) => alert(f.name)} />
      </div>
    );
  }
</script>
```

<br/>

### 8. Dynamic Island
An iOS-style dynamic island for premium notifications and context awareness.

**Available Components:** `DynamicIsland`

**React Usage:**
```jsx
import { DynamicIsland } from 'functional-ui';

export default function Notifications() {
  return (
    <div className="flex justify-center w-full">
      <DynamicIsland 
        status="active" 
        message="Recording Audio..." 
      />
    </div>
  );
}
```

**CDN Usage:**
```html
<script src="https://cdn.jsdelivr.net/npm/functional-ui/dist/index.umd.min.js"></script>

<script type="text/babel">
  const { DynamicIsland } = window.UiLibrarySpj;

  function App() {
    return (
      <div className="pt-4 flex justify-center">
        <DynamicIsland status="success" message="Saved!" />
      </div>
    );
  }
</script>
```

<br/>

### 9. Carousel
A minimalist, smooth-scrolling carousel for images or content cards.

**Available Components:** `BasicCarousel`

**React Usage:**
```jsx
import { BasicCarousel } from 'functional-ui';

export default function ImageGallery() {
  const images = ['/img1.jpg', '/img2.jpg', '/img3.jpg'];
  return <BasicCarousel items={images} />;
}
```

**CDN Usage:**
```html
<script src="https://cdn.jsdelivr.net/npm/functional-ui/dist/index.umd.min.js"></script>

<script type="text/babel">
  const { BasicCarousel } = window.UiLibrarySpj;

  function App() {
    return (
      <div className="max-w-lg mx-auto">
        <BasicCarousel items={['A', 'B', 'C']} />
      </div>
    );
  }
</script>
```

<br/>

### 10. Footers
A variety of footers, ranging from clean and simple to rich, newsletter-integrated layouts.

**Available Components:** `SimpleFooter`, `NewsletterFooter`, `DynamicFooter`

**React Usage:**
```jsx
import { SimpleFooter, NewsletterFooter, DynamicFooter } from 'functional-ui';

export default function Layout() {
  return (
    <div className="space-y-10 bg-gray-100 p-10">
      <SimpleFooter links={[{ label: 'Home', url: '/' }]} />
      <NewsletterFooter onSubscribe={(email) => console.log(email)} />
      <DynamicFooter sections={[]} />
    </div>
  );
}
```

**CDN Usage:**
```html
<script src="https://cdn.jsdelivr.net/npm/functional-ui/dist/index.umd.min.js"></script>

<script type="text/babel">
  const { NewsletterFooter } = window.UiLibrarySpj;

  function App() {
    return (
      <div className="mt-20 border-t border-gray-200">
        <NewsletterFooter onSubscribe={(email) => alert(email)} />
      </div>
    );
  }
</script>
```

<br/>
<br/>

---

## 🎨 Design Philosophy

Functional UI adheres to a strict design system. We believe a library should be inherently intuitive, aesthetically premium, and robust right out of the box without endless customization overhead.

1. **Monochrome Focus**: We rely entirely on black, white, and shades of gray. Color is used sparingly, relying instead on depth (`shadow-[0_8px_30px_rgb(0,0,0,0.08)]`) and strict 1px borders (`border-gray-200`) to establish UI hierarchy.
2. **Pixel Perfection & Predictability**: Components like our DatePickers and Carousels are built with locked widths to guarantee absolute symmetry, preventing layout shifts that plague other libraries.
3. **Zero Configuration**: No complex theme providers or contexts are required. Simply import the component and it works.

<br/>

---

## 🛠️ For Contributors

If you are developing or contributing to Functional UI locally:

1. **Structure**: Place new components in their dedicated subdirectory inside `components/` (e.g., `components/buttons`).
2. **Implementation**: Ensure you are strictly using React + TailwindCSS utility classes. No external CSS files.
3. **Export**: Ensure your new component is exported in the root `index.js`.
4. **Build**: Run `npm run build` (which utilizes Rollup under the hood) to compile the React/Tailwind code into the distributable formats.

<br/>

<div align="center">
  <p>Crafted with precision.</p>
</div>
