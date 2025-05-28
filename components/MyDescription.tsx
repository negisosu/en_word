export function MyDescription ({children}: { children: React.ReactNode}){
    return(
        <div className="my-2 sm:my-4 text-sm text-muted-foreground">
            {children}
        </div>
    )
}