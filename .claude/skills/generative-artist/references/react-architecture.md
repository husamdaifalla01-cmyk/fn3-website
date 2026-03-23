# React Architecture Reference

Compound components, CVA, state machines, TypeScript patterns for production-grade UI.

---

## Core Principles

**Complexity budget:** Every component has a complexity budget. When a component exceeds its budget, it must be decomposed — not extended. Signs you've exceeded the budget:
- Prop count > 8
- Conditional rendering branches > 3
- State variables > 3
- The component does two unrelated things

**Single responsibility:** A component should have one reason to change. If changing the appearance AND changing the data both require touching the same component, the separation is wrong.

---

## Compound Components

The pattern for building expressive, composable APIs. Instead of a single `<Modal isOpen={true} title="..." body="..." footer="..." />`, compound components let users compose the pieces:

```tsx
<Modal>
  <Modal.Trigger asChild>
    <Button>Open</Button>
  </Modal.Trigger>
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Confirm Action</Modal.Title>
      <Modal.Close />
    </Modal.Header>
    <Modal.Body>
      Are you sure?
    </Modal.Body>
    <Modal.Footer>
      <Modal.Close asChild>
        <Button variant="ghost">Cancel</Button>
      </Modal.Close>
      <Button variant="destructive">Confirm</Button>
    </Modal.Footer>
  </Modal.Content>
</Modal>
```

### Implementation with Context

```tsx
import { createContext, useContext, useState } from "react"

// 1. Create the context
interface ModalContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

function useModalContext() {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error("Modal components must be used within <Modal>")
  return ctx
}

// 2. Root provider
function Modal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  )
}

// 3. Sub-components access shared state via context
Modal.Trigger = function Trigger({ children }: { children: React.ReactNode }) {
  const { setOpen } = useModalContext()
  return <div onClick={() => setOpen(true)}>{children}</div>
}

Modal.Close = function Close({ children }: { children?: React.ReactNode }) {
  const { setOpen } = useModalContext()
  if (children) return <div onClick={() => setOpen(false)}>{children}</div>
  return <button onClick={() => setOpen(false)}>×</button>
}

Modal.Content = function Content({ children }: { children: React.ReactNode }) {
  const { open } = useModalContext()
  if (!open) return null
  return <div className="modal-overlay"><div className="modal-panel">{children}</div></div>
}

Modal.Title = function Title({ children }: { children: React.ReactNode }) {
  return <h2 className="modal-title">{children}</h2>
}

// 4. Export the compound
export { Modal }
```

---

## CVA — Class Variance Authority

The TypeScript-native way to build component variants. Replaces conditionals and string concatenation.

```tsx
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const button = cva(
  // Base styles applied to all variants
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:     "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:     "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost:       "hover:bg-accent hover:text-accent-foreground",
        link:        "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm:      "h-9 px-3 text-sm",
        default: "h-10 px-4 text-sm",
        lg:      "h-11 px-8 text-base",
        icon:    "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// TypeScript variant props from CVA definition
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(button({ variant, size }), className)}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
```

### cn() utility (required with CVA)

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Merges class names and resolves Tailwind conflicts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// Usage: cn("px-4 py-2", conditional && "font-bold", className)
```

---

## Polymorphic `as` Prop

Build components that render as different HTML elements or other components without losing type safety.

```tsx
type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"]

type AsProp<C extends React.ElementType> = {
  as?: C
}

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P)

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

// Example: Text component that can render as any element
type TextProps<C extends React.ElementType> = PolymorphicComponentProp<
  C,
  { size?: "sm" | "md" | "lg" }
>

function Text<C extends React.ElementType = "span">({
  as,
  size = "md",
  children,
  className,
  ...props
}: TextProps<C>) {
  const Component = as || "span"
  return (
    <Component
      className={cn(textVariants({ size }), className)}
      {...props}
    >
      {children}
    </Component>
  )
}

// Usage:
// <Text as="h1" size="lg">Heading</Text>    — renders as <h1>
// <Text as="p" size="md">Body text</Text>   — renders as <p>
// <Text as={Link} href="/about">Link</Text> — renders as Next.js Link
```

---

## forwardRef Pattern

Required when parent components need a DOM ref (e.g., for focus management, measurements, or third-party libraries).

```tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || React.useId()

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium">
            {label}
          </label>
        )}
        <input
          ref={ref}        // Forward the ref to the native input
          id={inputId}
          className={cn(
            "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            error && "border-destructive",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

// Usage in parent:
// const inputRef = useRef<HTMLInputElement>(null)
// <Input ref={inputRef} label="Email" />
// inputRef.current?.focus()  // Works
```

---

## State Machines over Boolean Flags

Boolean flags for complex state compound into impossible states. State machines prevent this.

```tsx
// BAD — Boolean flag hell
// Can be: isLoading=true, isError=false, isSuccess=false
// Can also be: isLoading=true, isError=true, isSuccess=true  ← impossible
const [isLoading, setIsLoading] = useState(false)
const [isError, setIsError] = useState(false)
const [isSuccess, setIsSuccess] = useState(false)
const [data, setData] = useState(null)

// GOOD — Explicit state machine
type FetchState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error }

function useFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({ status: "idle" })

  const fetch = async () => {
    setState({ status: "loading" })
    try {
      const res = await window.fetch(url)
      const data = await res.json() as T
      setState({ status: "success", data })
    } catch (error) {
      setState({ status: "error", error: error as Error })
    }
  }

  return { state, fetch }
}

// Usage with exhaustive type narrowing:
function DataView() {
  const { state, fetch } = useFetch<User[]>("/api/users")

  switch (state.status) {
    case "idle":    return <button onClick={fetch}>Load</button>
    case "loading": return <Skeleton />
    case "error":   return <ErrorMessage error={state.error} />
    case "success": return <UserList users={state.data} />
    // TypeScript enforces all cases are handled
  }
}
```

---

## Component File Structure

```
components/
  ui/                           # Primitive, reusable components (no business logic)
    button.tsx                  # CVA variants, forwardRef
    input.tsx                   # forwardRef, label, error state
    modal.tsx                   # Compound component
    card.tsx
    ...

  features/                     # Feature-specific components (business logic OK)
    auth/
      login-form.tsx            # Uses <Input>, <Button> from ui/
      signup-form.tsx
    dashboard/
      metrics-card.tsx
      ...

  layouts/                      # Page structure components
    app-shell.tsx
    sidebar.tsx
    header.tsx
```

### Single Component File Template

```tsx
// 1. Types (exported if consumed externally)
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

// 2. Variants (CVA)
const buttonVariants = cva("...", { variants: { ... } })

// 3. Component (forwardRef if ref needed)
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  }
)
Button.displayName = "Button"

// 4. Sub-components if compound pattern
Button.Icon = function ButtonIcon({ children }: { children: React.ReactNode }) {
  return <span className="mr-2 h-4 w-4">{children}</span>
}

// 5. Export
export { Button, buttonVariants }
```

---

## TypeScript Patterns

### Discriminated Union Props

```typescript
// Instead of optional props that create implicit relationships:
interface BadProps {
  href?: string         // Only makes sense if isLink is true
  isLink?: boolean      // Must remember to set both
  onClick?: () => void  // Irrelevant if isLink is true
}

// Use discriminated unions:
type ButtonPropsBase = { children: React.ReactNode; className?: string }
type LinkButton = ButtonPropsBase & { as: "link"; href: string }
type ActionButton = ButtonPropsBase & { as?: "button"; onClick: () => void }
type ButtonProps = LinkButton | ActionButton

// TypeScript now enforces: if as="link", href is required; otherwise onClick is required
```

### Generic Component Props

```typescript
// A Select component that preserves the value type
interface SelectProps<T> {
  options: { label: string; value: T }[]
  value: T
  onChange: (value: T) => void
}

function Select<T extends string | number>({ options, value, onChange }: SelectProps<T>) {
  return (
    <select value={String(value)} onChange={e => onChange(options[e.target.selectedIndex].value)}>
      {options.map(opt => (
        <option key={String(opt.value)} value={String(opt.value)}>{opt.label}</option>
      ))}
    </select>
  )
}

// TypeScript infers T from usage:
// <Select options={[{ label: "A", value: 1 }]} value={1} onChange={(v) => ...} />
// v is inferred as `number`
```

### Strict Event Handler Types

```typescript
// Don't use `any` for event handlers
type InputChangeHandler = React.ChangeEventHandler<HTMLInputElement>
type FormSubmitHandler = React.FormEventHandler<HTMLFormElement>
type ButtonClickHandler = React.MouseEventHandler<HTMLButtonElement>

// Or inline:
function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  setValue(e.target.value)
}
```

---

## Hook Patterns

### Custom Hook = Single Responsibility

```typescript
// BAD: One hook doing too many things
function useUserDashboard() {
  // fetches user, fetches metrics, handles auth, manages modals...
  // 200 lines later...
}

// GOOD: Composed focused hooks
function useUser(userId: string) { /* fetch and cache user */ }
function useUserMetrics(userId: string) { /* fetch metrics */ }
function useModal(id: string) { /* manage modal open state */ }

// Compose in component:
function Dashboard({ userId }: { userId: string }) {
  const { user } = useUser(userId)
  const { metrics } = useUserMetrics(userId)
  const editModal = useModal("edit-user")
  // ...
}
```

### Hook Return Convention

```typescript
// For data hooks: return object with named properties
function useUser(id: string) {
  return {
    user: data,
    isLoading,
    error,
    refetch,
    mutate
  }
}

// For action hooks: return tuple [value, action] for simple cases
function useToggle(initial = false): [boolean, () => void] {
  const [value, setValue] = useState(initial)
  return [value, () => setValue(v => !v)]
}

// For complex action hooks: return object
function useForm<T>(schema: ZodSchema<T>) {
  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    reset,
    isDirty,
    isValid
  }
}
```
