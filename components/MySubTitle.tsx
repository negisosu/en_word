export function MySubTitle({ children }: { children: React.ReactNode}) {
    return(
        <h2 className="my-2 sm:my-4 text-lg sm:text-2xl font-bold">
            {children}
        </h2>
    )
}