import { SlideIn } from "../SlideIn";

export function MyDescription ({children}: { children: React.ReactNode}){
    return(
        <SlideIn className="my-2 sm:my-4 text-sm text-muted-foreground">
            {children}
        </SlideIn>
    )
}