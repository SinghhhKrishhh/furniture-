import Link from "next/link"
import { auth, signIn, signOut } from "@/auth"

export default async function Navbar() {
  const session = await auth()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-slate-900 text-white border-b border-slate-700">
      <Link href="/" className="text-xl font-bold">RoomCraft</Link>
      
      <div className="flex gap-4 items-center">
        {session?.user ? (
          <div className="relative group">
            <button className="flex items-center gap-2 hover:text-slate-300">
              <span>{session.user.name || 'Account'}</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg hidden group-hover:block">
              <Link href="/account" className="block px-4 py-2 hover:bg-slate-100">My Account</Link>
              <Link href="/orders" className="block px-4 py-2 hover:bg-slate-100">Order History</Link>
              <form
                action={async () => {
                  "use server"
                  await signOut()
                }}
              >
                <button type="submit" className="w-full text-left px-4 py-2 hover:bg-slate-100 border-t">
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        ) : (
          <form
            action={async () => {
              "use server"
              await signIn()
            }}
          >
            <button type="submit" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
              Sign In
            </button>
          </form>
        )}
      </div>
    </nav>
  )
}
