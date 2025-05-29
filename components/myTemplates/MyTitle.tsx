export function MyTitle({children}: { children: React.ReactNode}) {
    return(
        <h1 className="my-2 sm:my-4 text-2xl sm:text-3xl font-bold">
            {children}
        </h1>
    )
}