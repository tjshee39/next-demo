import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* 로고 */}
          <div className="text-2xl font-bold text-gray-900">MyLogo</div>

          {/* 데스크탑 메뉴 */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-500">
              Home
            </Link>
            <Link href="/sample" className="text-gray-700 hover:text-blue-500">
              Sample
            </Link>
            <Link href="/list" className="text-gray-700 hover:text-blue-500">
              List
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
