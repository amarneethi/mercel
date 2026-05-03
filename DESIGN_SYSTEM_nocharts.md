## Component Inventory

| Import Statement | Component Name |
|---|---|
| `import { Button } from 'aopends'` | Button |
| `import { TextInput } from 'aopends'` | TextInput |
| `import { Checkbox } from 'aopends'` | Checkbox |
| `import { Toggle } from 'aopends'` | Toggle |
| `import { Select } from 'aopends'` | Select |
| `import { Tag } from 'aopends'` | Tag |
| `import { Notification } from 'aopends'` | Notification |
| `import { Toast } from 'aopends'` | Toast |
| `import { Banner } from 'aopends'` | Banner |
| `import { Spinner } from 'aopends'` | Spinner |
| `import { Skeleton } from 'aopends'` | Skeleton |
| `import { SkeletonText } from 'aopends'` | SkeletonText |
| `import { TableSkeleton } from 'aopends'` | TableSkeleton |
| `import { Header } from 'aopends'` | Header |
| `import { SideNav } from 'aopends'` | SideNav |
| `import { Breadcrumb } from 'aopends'` | Breadcrumb |
| `import { Tabs } from 'aopends'` | Tabs |
| `import { Modal } from 'aopends'` | Modal |
| `import { Dropdown } from 'aopends'` | Dropdown |
| `import { OverflowMenu } from 'aopends'` | OverflowMenu |
| `import { DatePicker } from 'aopends'` | DatePicker |
| `import { Form, FormGroup, FormRow, FormActions } from 'aopends'` | Form, FormGroup, FormRow, FormActions |
| `import { Search } from 'aopends'` | Search |
| `import { DataTable } from 'aopends'` | DataTable |
| `import { Pagination } from 'aopends'` | Pagination |
| `import { KpiCard } from 'aopends'` | KpiCard |

---

## Component Props

### Button

```jsx
<Button
  variant="primary"        // "primary" | "secondary" | "tertiary" | "danger" | "ghost"
  size="md"                // "sm" | "md" | "lg"
  disabled={false}         // disables the button
  loading={false}          // shows Loader2 spinner, disables button
  icon={<IconComponent />} // icon element to render
  iconPosition="left"      // "left" | "right"
  fullWidth={false}        // stretches to full container width
  className=""             // additional CSS classes
  type="button"            // "button" | "submit" | "reset"
  onClick={fn}
>
  Label
</Button>
```

### TextInput

```jsx
<TextInput
  label="Email"              // label text
  helperText="We'll never share your email"
  errorText=""               // error message, triggers error state
  successText=""             // success message, triggers success state
  size="md"                  // "sm" | "md" | "lg"
  disabled={false}
  required={false}
  id="email-input"           // auto-generated if omitted
  className=""               // additional CSS classes for the input
  wrapperClassName=""         // additional CSS classes for the wrapper
  icon={<MailIcon />}        // icon displayed inside the input (left)
/>
```

### Checkbox

```jsx
<Checkbox
  label="Accept terms"
  checked={false}            // controlled checked state
  defaultChecked={false}     // uncontrolled initial state
  indeterminate={false}      // indeterminate (mixed) state
  disabled={false}
  size="md"                  // "sm" | "md" | "lg"
  onChange={fn}              // (checked: boolean) => void
  id="terms-checkbox"        // auto-generated if omitted
  className=""
  wrapperClassName=""
/>
```

### Toggle

```jsx
<Toggle
  label="Dark mode"
  checked={false}            // controlled checked state
  defaultChecked={false}     // uncontrolled initial state
  disabled={false}
  size="md"                  // "sm" | "md" | "lg"
  onChange={fn}              // (checked: boolean) => void
  id="dark-mode-toggle"      // auto-generated if omitted
  className=""
  wrapperClassName=""
/>
```

### Select

```jsx
<Select
  label="Country"
  options={["US", "UK"]}     // Array<string | { value, label }>
  placeholder="Select an option"
  helperText=""
  errorText=""
  size="md"                  // "sm" | "md" | "lg"
  disabled={false}
  required={false}
  id="country-select"        // auto-generated if omitted
  className=""
  wrapperClassName=""
  value=""                   // controlled value
  onChange={fn}              // (value: string) => void
/>
```

### Tag

```jsx
<Tag
  intent="default"           // "default" | "brand" | "success" | "warning" | "danger" | "info"
  size="md"                  // "sm" | "md" | "lg"
  closable={false}           // shows a close button
  onClose={fn}
  icon={<TagIcon />}
  outline={false}            // renders as outlined style
  className=""
>
  Label
</Tag>
```

### Notification

```jsx
<Notification
  intent="info"              // "success" | "warning" | "error" | "info"
  title="Heads up"
  closable={true}            // shows close button
  onClose={fn}
  className=""
>
  Body content here.
</Notification>
```

### Toast

```jsx
<Toast
  intent="info"              // "success" | "warning" | "error" | "info"
  title="Saved"
  duration={5000}            // auto-dismiss duration in ms
  onClose={fn}
  open={true}
>
  Body content here.
</Toast>
```

### Banner

```jsx
<Banner
  intent="info"              // "success" | "warning" | "error" | "info"
  closable={true}            // shows close button
  onClose={fn}
  className=""
>
  Banner content here.
</Banner>
```

### Spinner

```jsx
<Spinner
  size="md"                  // "sm" | "md" | "lg" | "xl"
  label="Loading..."         // accessible label (screen reader only)
  className=""
/>
```

### Skeleton

```jsx
<Skeleton
  width="100%"               // string | number
  height="100%"              // string | number ("1em" for text variant)
  variant="rectangular"      // "rectangular" | "circular" | "text"
  className=""
  style={{}}                 // inline styles
/>
```

### SkeletonText

```jsx
<SkeletonText
  lines={3}                  // number of skeleton lines
  className=""
/>
```

### TableSkeleton

```jsx
<TableSkeleton
  rows={5}                   // number of placeholder rows
  columns={4}                // number of placeholder columns
  className=""
/>
```

### Header

```jsx
<Header
  logo={<LogoComponent />}   // logo element
  productName="Product"
  items={[                    // Array<{ label, href?, onClick?, icon?, active? }>
    { label: "Dashboard", href: "/", active: true },
    { label: "Settings", href: "/settings", icon: <GearIcon /> }
  ]}
  actions={<Button>Sign In</Button>}  // right-aligned action area
  className=""
/>
```

### SideNav

```jsx
<SideNav
  items={[                    // Array<{ label, href?, onClick?, icon?, active?, badge?, children?, expanded?, divider?, dividerLabel? }>
    { label: "Home", href: "/", icon: <HomeIcon />, active: true },
    { label: "Reports", icon: <ChartIcon />, badge: "3",
      children: [{ label: "Monthly", href: "/reports/monthly" }],
      expanded: false },
    { divider: true, dividerLabel: "Section" }
  ]}
  header={<Logo />}           // header slot
  footer={<UserMenu />}       // footer slot
  collapsed={false}           // collapsed (icon-only) mode
  className=""
/>
```

### Breadcrumb

```jsx
<Breadcrumb
  items={[                    // Array<{ label, href?, onClick?, icon? }> — last is current page
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Widget" }
  ]}
  separator={<ChevronRight />}  // custom separator element
  className=""
/>
```

### Tabs

```jsx
<Tabs
  items={[                    // Array<{ value, label, content?, icon?, badge?, disabled? }>
    { value: "tab1", label: "Overview", content: <Overview /> },
    { value: "tab2", label: "Details", content: <Details />, badge: "New" },
    { value: "tab3", label: "Disabled", content: null, disabled: true }
  ]}
  defaultValue="tab1"         // initially active tab (first tab if omitted)
  value=""                    // controlled active tab
  onChange={fn}               // (value: string) => void
  variant="underline"         // "underline" | "pill"
  size="md"                   // "sm" | "md" | "lg"
  fullWidth={false}           // stretches tabs to fill width
  className=""
/>
```

### Modal

```jsx
<Modal
  open={false}                // controls visibility
  onClose={fn}
  title="Confirm Action"
  footer={<Button>Save</Button>}  // footer content (typically buttons)
  size="md"                   // "sm" | "md" | "lg" | "xl" | "full"
  closeOnOverlay={true}       // close when clicking overlay
  closeOnEsc={true}           // close on Escape key
  closable={true}             // shows close (X) button
  className=""
>
  Dialog body content.
</Modal>
```

### Dropdown

```jsx
<Dropdown
  label="Role"
  options={["Admin", "User"]} // Array<string | { value, label, disabled? }>
  value=""                    // selected value
  onChange={fn}
  placeholder="Select..."
  size="md"                   // "sm" | "md" | "lg"
  disabled={false}
  required={false}
  errorText=""
  helperText=""
  id="role-dropdown"          // auto-generated if omitted
  className=""
  wrapperClassName=""
/>
```

### OverflowMenu

```jsx
<OverflowMenu
  items={[                    // Array<{ label, onClick?, icon?, shortcut?, danger?, disabled?, divider?, dividerLabel? }>
    { label: "Edit", onClick: fn, icon: <EditIcon />, shortcut: "⌘E" },
    { divider: true, dividerLabel: "Danger zone" },
    { label: "Delete", onClick: fn, danger: true }
  ]}
  trigger={<IconButton />}    // custom trigger element (defaults to vertical dots icon)
  align="right"               // "left" | "right"
  size="md"                   // "sm" | "md" | "lg"
  className=""
/>
```

### DatePicker

```jsx
<DatePicker
  label="Start Date"
  value=""                    // selected date (YYYY-MM-DD) — or start date in range mode
  onChange={fn}               // single: (value: string) => void  |  range: ({ start, end }) => void
  rangeEnd=""                 // end date for range mode (display only)
  mode="single"               // "single" | "range"
  placeholder="Select date"
  disabled={false}
  required={false}
  errorText=""
  helperText=""
  min=""                      // minimum selectable date
  max=""                      // maximum selectable date
  size="md"                   // "sm" | "md" | "lg"
  id="start-date"             // auto-generated if omitted
  className=""
  wrapperClassName=""
/>
```

### Form

```jsx
<Form
  onSubmit={fn}               // submit handler (prevents default)
  className=""
>
  {/* form content */}
</Form>
```

### FormGroup

```jsx
<FormGroup
  legend="Personal Info"      // section heading
  className=""
>
  {/* grouped fields */}
</FormGroup>
```

### FormRow

```jsx
<FormRow className="">
  {/* side-by-side fields */}
</FormRow>
```

### FormActions

```jsx
<FormActions
  align="right"              // "left" | "center" | "right" | "between"
  className=""
>
  {/* action buttons */}
</FormActions>
```

### Search

```jsx
<Search
  value=""                    // controlled search value
  onChange={fn}               // (value: string) => void — input change
  onSubmit={fn}               // (value: string) => void — debounced + Enter
  onClear={fn}
  placeholder="Search..."
  options={[                  // Array<string | { value, label, description?, disabled? }>
    "Dashboard",
    { value: "users", label: "Users", description: "Manage user accounts" }
  ]}
  onOptionSelect={fn}         // called when a suggestion option is clicked
  loading={false}             // shows a loading spinner
  size="md"                   // "sm" | "md" | "lg"
  disabled={false}
  scope="Projects"            // scope label chip inside the input
  id="global-search"          // auto-generated if omitted
  className=""
  wrapperClassName=""
  debounceMs={300}            // debounce delay for onSubmit
/>
```

### DataTable

```jsx
<DataTable
  columns={[                  // Array<{ key, header, width?, minWidth?, sortable?, sortFn?, render? }>
    { key: "name", header: "Name", sortable: true },
    { key: "status", header: "Status", render: (val,row) => <Tag>{val}</Tag> }, { 
      key: "name", 
      header: "TASK NAME", 
      sortable: true, 
      render: (val, row) => (
        <div className="flex flex-col">
          <span className="font-semibold text-sm leading-tight">{row.name}</span>
          <span className="text-xs text-secondary opacity-80">{row.description}</span>
        </div>
      ) 
    }
  ]}
  data={[{ name: "Alice", status: "Active" }]}
  sortable={true}             // enables column sorting
  defaultSort={{ column: "", direction: "asc" }}  // initial sort state
  onSort={fn}                 // ({ column, direction }) => void
  selectable={false}          // enables row selection
  selectedRows={[]}           // selected row indices
  onSelectionChange={fn}      // (indices: number[]) => void
  paginated={false}           // enables pagination
  pageSize={undefined}        // controlled page size
  defaultPageSize={10}
  pageSizeOptions={[10, 25, 50, 100]}
  editableColumns={[]}        // column keys that are inline-editable
  onCellEdit={fn}             // ({ rowIndex, column, value }) => void
  batchActions={<Button />}   // batch action buttons when rows are selected
  filterValue=""              // external filter value
  onFilterChange={fn}
  loading={false}
  emptyMessage="No data available"
  stickyHeader={false}        // makes header sticky
  size="md"                   // "sm" (compact) | "md" (default)
  striped={false}             // alternating row backgrounds
  className=""
/>
```

### Pagination

```jsx
<Pagination
  value={1}                   // current page (controlled)
  totalPages={1}
  totalItems={100}
  pageSize={10}
  onChange={fn}               // (page: number) => void
  onPageSizeChange={fn}       // (size: number) => void
  pageSizeOptions={[10, 25, 50, 100]}
  siblingCount={1}            // pages shown beside current
  showPageSizeSelector={false}
  showItemCount={false}       // shows item range text
  className=""
/>
```

### KpiCard

```jsx
<KpiCard
  label="Revenue"
  value="$12,340"             // string | number
  variant="simple"            // "simple" | "with-trend" | "with-delta" | "with-progress" | "with-icon"
  trendData={[10, 20, 15]}   // sparkline data (with-trend)
  trendColor="#3b82f6"        // sparkline color (with-trend)
  delta={12.5}               // change value (with-delta)
  deltaFormat="percentage"    // "percentage" | "absolute"
  deltaLabel="vs last month"  // description below delta
  progress={75}              // progress value 0–100 (with-progress)
  target="$15,000"           // target value label (with-progress)
  progressType="bar"          // "bar" | "ring"
  progressColor="#22c55e"
  icon={<DollarIcon />}       // icon element (with-icon)
  iconColor="#3b82f6"         // icon background tint color
  className=""
/>
```

---

## Design Tokens

### Semantic Tokens

Semantic tokens map primitive values to purpose-driven roles. Components reference **only** semantic tokens, never primitives. Themes override these values to produce light, dark, and high-contrast appearances.

**Activation:** Set `data-theme="light"` or `data-theme="dark"` on a parent element (typically `<html>` or `<body>`). Light is the default when no attribute is set.

#### Background

| Token | Description | Light | Dark |
|---|---|---|---|
| `--ds-bg-primary` | Page / card background | `#ffffff` | `gray-950` |
| `--ds-bg-secondary` | Subtle section background | `gray-50` | `gray-900` |
| `--ds-bg-tertiary` | Inset / recessed background | `gray-100` | `gray-800` |
| `--ds-bg-inverse` | Inverted background | `gray-900` | `white` |
| `--ds-bg-brand` | Brand fill (buttons, badges) | `blue-600` | `blue-500` |
| `--ds-bg-brand-hover` | Brand fill hover | `blue-700` | `blue-400` |
| `--ds-bg-danger` | Danger fill | `red-600` | `red-500` |
| `--ds-bg-danger-hover` | Danger fill hover | `red-700` | `red-400` |
| `--ds-bg-success` | Success background | `green-50` | `green-800/0.3` |
| `--ds-bg-warning` | Warning background | `amber-50` | `amber-800/0.3` |
| `--ds-bg-info` | Informational background | `teal-50` | `teal-800/0.3` |
| `--ds-bg-error` | Error background | `red-50` | `red-800/0.3` |
| `--ds-bg-overlay` | Modal/dialog overlay | `black/0.5` | `black/0.7` |
| `--ds-bg-hover` | Generic hover | `gray-100` | `gray-800` |
| `--ds-bg-active` | Generic active/pressed | `gray-200` | `gray-700` |
| `--ds-bg-selected` | Selected state | `blue-50` | `blue-600/0.2` |
| `--ds-bg-disabled` | Disabled background | `gray-100` | `gray-800` |

#### Text

| Token | Description | Light | Dark |
|---|---|---|---|
| `--ds-text-primary` | Primary body text | `gray-900` | `gray-50` |
| `--ds-text-secondary` | Secondary / helper text | `gray-600` | `gray-400` |
| `--ds-text-tertiary` | Tertiary / muted text | `gray-400` | `gray-500` |
| `--ds-text-inverse` | Text on inverse backgrounds | `white` | `gray-900` |
| `--ds-text-brand` | Brand-colored text | `blue-600` | `blue-400` |
| `--ds-text-danger` | Danger / error text | `red-600` | `red-400` |
| `--ds-text-success` | Success text | `green-700` | `green-400` |
| `--ds-text-warning` | Warning text | `amber-700` | `amber-400` |
| `--ds-text-info` | Informational text | `teal-700` | `teal-400` |
| `--ds-text-disabled` | Disabled text | `gray-400` | `gray-600` |
| `--ds-text-placeholder` | Placeholder text | `gray-400` | `gray-600` |
| `--ds-text-on-brand` | Text on brand backgrounds | `white` | `white` |
| `--ds-text-link` | Link text | `blue-600` | `blue-400` |
| `--ds-text-link-hover` | Link hover text | `blue-700` | `blue-300` |

#### Border

| Token | Description | Light | Dark |
|---|---|---|---|
| `--ds-border-primary` | Default border | `gray-200` | `gray-700` |
| `--ds-border-secondary` | Stronger border | `gray-300` | `gray-600` |
| `--ds-border-focus` | Focus ring border | `blue-500` | `blue-400` |
| `--ds-border-error` | Error state border | `red-500` | `red-400` |
| `--ds-border-success` | Success state border | `green-500` | `green-400` |
| `--ds-border-warning` | Warning state border | `amber-500` | `amber-400` |
| `--ds-border-info` | Info state border | `teal-500` | `teal-400` |
| `--ds-border-disabled` | Disabled border | `gray-200` | `gray-700` |
| `--ds-border-brand` | Brand border | `blue-600` | `blue-400` |
| `--ds-border-inverse` | Inverse border | `gray-700` | `gray-200` |

#### Icon

| Token | Description | Light | Dark |
|---|---|---|---|
| `--ds-icon-primary` | Default icon color | `gray-700` | `gray-300` |
| `--ds-icon-secondary` | Secondary icon color | `gray-500` | `gray-500` |
| `--ds-icon-inverse` | Inverse icon color | `white` | `gray-900` |
| `--ds-icon-brand` | Brand icon color | `blue-600` | `blue-400` |
| `--ds-icon-danger` | Danger icon color | `red-500` | `red-400` |
| `--ds-icon-success` | Success icon color | `green-500` | `green-400` |
| `--ds-icon-warning` | Warning icon color | `amber-500` | `amber-400` |
| `--ds-icon-info` | Info icon color | `teal-500` | `teal-400` |
| `--ds-icon-disabled` | Disabled icon color | `gray-300` | `gray-600` |

#### Component-Specific Tokens

| Token | Description |
|---|---|
| `--ds-input-bg` | Input background |
| `--ds-input-border` | Input border |
| `--ds-input-border-hover` | Input border on hover |
| `--ds-table-header-bg` | Table header background |
| `--ds-table-row-hover` | Table row hover |
| `--ds-table-row-selected` | Table row selected |
| `--ds-table-border` | Table border |
| `--ds-sidebar-bg` | Sidebar background |
| `--ds-sidebar-text` | Sidebar text |
| `--ds-sidebar-text-active` | Sidebar active item text |
| `--ds-sidebar-hover` | Sidebar item hover |
| `--ds-sidebar-active` | Sidebar active item background |
| `--ds-sidebar-border` | Sidebar border |
| `--ds-header-bg` | Header background |
| `--ds-header-border` | Header border |
| `--ds-focus-ring-color` | Focus ring color |
| `--ds-scrollbar-track` | Scrollbar track |
| `--ds-scrollbar-thumb` | Scrollbar thumb |
| `--ds-scrollbar-thumb-hover` | Scrollbar thumb hover |

---

### Typography

#### Font Families

| Token | Value |
|---|---|
| `--ds-font-sans` | `var(--font-geist-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)` |
| `--ds-font-mono` | `var(--font-geist-mono, 'SF Mono', 'Fira Code', 'Fira Mono', monospace)` |

#### Font Sizes

| Token | Value |
|---|---|
| `--ds-text-xs` | `0.75rem` (12px) |
| `--ds-text-sm` | `0.875rem` (14px) |
| `--ds-text-md` | `1rem` (16px) |
| `--ds-text-lg` | `1.125rem` (18px) |
| `--ds-text-xl` | `1.25rem` (20px) |
| `--ds-text-2xl` | `1.5rem` (24px) |
| `--ds-text-3xl` | `1.875rem` (30px) |
| `--ds-text-4xl` | `2.25rem` (36px) |

#### Line Heights

| Token | Value |
|---|---|
| `--ds-leading-none` | `1` |
| `--ds-leading-tight` | `1.25` |
| `--ds-leading-snug` | `1.375` |
| `--ds-leading-normal` | `1.5` |
| `--ds-leading-relaxed` | `1.625` |

#### Font Weights

| Token | Value |
|---|---|
| `--ds-font-regular` | `400` |
| `--ds-font-medium` | `500` |
| `--ds-font-semibold` | `600` |
| `--ds-font-bold` | `700` |

#### Letter Spacing

| Token | Value |
|---|---|
| `--ds-tracking-tight` | `-0.025em` |
| `--ds-tracking-normal` | `0` |
| `--ds-tracking-wide` | `0.025em` |
| `--ds-tracking-wider` | `0.05em` |
| `--ds-tracking-widest` | `0.1em` |

---

### Additional Base Tokens

#### Spacing (4px base unit)

| Token | Value |
|---|---|
| `--ds-spacing-0` | `0` |
| `--ds-spacing-1` | `0.25rem` (4px) |
| `--ds-spacing-2` | `0.5rem` (8px) |
| `--ds-spacing-3` | `0.75rem` (12px) |
| `--ds-spacing-4` | `1rem` (16px) |
| `--ds-spacing-5` | `1.25rem` (20px) |
| `--ds-spacing-6` | `1.5rem` (24px) |
| `--ds-spacing-8` | `2rem` (32px) |
| `--ds-spacing-10` | `2.5rem` (40px) |
| `--ds-spacing-12` | `3rem` (48px) |
| `--ds-spacing-16` | `4rem` (64px) |
| `--ds-spacing-20` | `5rem` (80px) |
| `--ds-spacing-24` | `6rem` (96px) |

#### Sizing

| Token | Value | Usage |
|---|---|---|
| `--ds-size-xs` | `1.5rem` (24px) | Small badges, tags |
| `--ds-size-sm` | `2rem` (32px) | Small buttons, inputs |
| `--ds-size-md` | `2.5rem` (40px) | Default buttons, inputs |
| `--ds-size-lg` | `3rem` (48px) | Large buttons, inputs |
| `--ds-size-xl` | `3.5rem` (56px) | Extra large |

#### Border Radius

| Token | Value |
|---|---|
| `--ds-radius-none` | `0` |
| `--ds-radius-sm` | `0.25rem` (4px) |
| `--ds-radius-md` | `0.375rem` (6px) |
| `--ds-radius-lg` | `0.5rem` (8px) |
| `--ds-radius-xl` | `0.75rem` (12px) |
| `--ds-radius-2xl` | `1rem` (16px) |
| `--ds-radius-full` | `9999px` |

#### Shadows

| Token | Value |
|---|---|
| `--ds-shadow-xs` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` |
| `--ds-shadow-sm` | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` |
| `--ds-shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` |
| `--ds-shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` |
| `--ds-shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` |
| `--ds-shadow-2xl` | `0 25px 50px -12px rgb(0 0 0 / 0.25)` |

#### Motion / Transitions

| Token | Value |
|---|---|
| `--ds-duration-fast` | `100ms` |
| `--ds-duration-normal` | `200ms` |
| `--ds-duration-slow` | `300ms` |
| `--ds-duration-slower` | `500ms` |
| `--ds-ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--ds-ease-in` | `cubic-bezier(0.4, 0, 1, 1)` |
| `--ds-ease-out` | `cubic-bezier(0, 0, 0.2, 1)` |
| `--ds-ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` |

#### Z-Index

| Token | Value | Usage |
|---|---|---|
| `--ds-z-dropdown` | `1000` | Dropdown menus |
| `--ds-z-sticky` | `1020` | Sticky elements |
| `--ds-z-fixed` | `1030` | Fixed headers |
| `--ds-z-modal-backdrop` | `1040` | Modal backdrops |
| `--ds-z-modal` | `1050` | Modal dialogs |
| `--ds-z-popover` | `1060` | Popovers |
| `--ds-z-tooltip` | `1070` | Tooltips |
| `--ds-z-toast` | `1080` | Toast notifications |
