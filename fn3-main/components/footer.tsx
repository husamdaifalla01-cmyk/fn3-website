export function Footer() {
  return (
    <footer className="bg-fn3-near-black px-6 lg:px-12 py-7 flex items-center justify-between">
      <span className="font-mono text-[12px] font-bold text-fn3-red tracking-[0.1em]">
        FN3
      </span>
      <span className="label-mono text-fn3-dark-label">
        © FlowNexis3 {new Date().getFullYear()} — All Rights Reserved
      </span>
    </footer>
  )
}
