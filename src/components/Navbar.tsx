const navlink = [
  { name: 'home', link: 'yogyy.vercel.app' },
  { name: 'blog', link: 'yogyy.vercel.app/posts' },
  { name: 'guestbook', link: 'burungbiru.vercel.app' }
]

export default function Navbar() {


  return (
    <nav className="text-sm font-medium mt-8 mb-16 w-fit">
      <ul className="flex flex-row gap-3">
        {navlink.map((nav, i) => (
          <li key={nav.name}>
            <a className='relative' href={`https://${nav.link}`} target='_blank'>
              {nav.name}
              {i === 0 && <div class="absolute h-[1px] top-5 inset-0 bg-gradient-to-r from-transparent to-white w-full" />}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
