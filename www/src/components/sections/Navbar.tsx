const Navbar = () => {
  return (
    <div className="container mx-auto flex justify-between items-center mt-2">
      <nav className="flex space-x-4 items-center">
        <a href="#" className="text-2xl font-bold text-blue-500 hover:text-blue-700 transition">EntApex</a>
        <a href="#" className="transition">Docs</a>
      </nav>
      <nav>
        <a href="#" className="text-gray-600 hover:text-gray-800 transition">GitHub</a>
      </nav>
    </div>
  )
}

export default Navbar