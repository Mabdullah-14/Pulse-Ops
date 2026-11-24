
export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white px-6 py-4">
      <div className="flex flex-col items-center justify-between gap-2 text-sm text-stone-500 sm:flex-row">
        <p>&copy; {new Date().getFullYear()} PulseOps. All rights reserved.</p>
        <nav className="flex items-center gap-5">
          <a href="#" className="hover:text-ink">Docs</a>
          <a href="#" className="hover:text-ink">Support</a>
          <a href="#" className="hover:text-ink">Privacy</a>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            All systems live
          </span>
        </nav>

      </div>
    </footer>
  );
}