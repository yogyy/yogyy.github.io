const navlink = [
  { name: "home", link: "yogyy.vercel.app" },
  { name: "blog", link: "yogyy.vercel.app/posts" },
  { name: "guestbook", link: "burungbiru.vercel.app" },
];

export default function Navbar() {
  return (
    <nav className="mb-16 mt-8 w-fit text-sm font-medium">
      <ul className="flex flex-row gap-3">
        {navlink.map((nav, i) => (
          <li key={nav.name}>
            <a
              className="relative"
              href={`https://${nav.link}`}
              target="_blank">
              {nav.name}
              {i === 0 && (
                <div className="absolute inset-0 top-5 h-[1px] w-full bg-gradient-to-r from-transparent to-white" />
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
