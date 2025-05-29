import { Skeleton } from "../ui/skeleton";

export function WordSetButtonsSkeleton() {
    return(
        <div className="w-full grid grid-cols-5 gap-2 my-2 sm:my-4">
            <Skeleton className="col-span-2 w-full h-full rounded-lg"/>
            <Skeleton className=" aspect-square w-full h-full rounded-lg"/>
        </div>
    )
}