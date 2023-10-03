function Header() {
    return  (
        <div className="flex gap-4 w-full container justify-between">
            <div className="title bg-secondary rounded-xl">
                <h1 className="text-text py-4 px-10">Library</h1>
            </div>
            <div className="nav-btn-wrapper bg-secondary rounded-xl flex gap-10">
                <a className="text-blue-800 py-4 pl-10 text-text opacity-60 hover:opacity-100" href="/dashboard">Home</a>
                <a className="text-blue-800 py-4  text-text opacity-60 hover:opacity-100" href="/dashboard/add">Add</a>
                <a className="text-blue-800 py-4 pr-10 text-text opacity-60 hover:opacity-100" href="">Logout</a>

            </div>
        </div>
    )
}

export default Header;