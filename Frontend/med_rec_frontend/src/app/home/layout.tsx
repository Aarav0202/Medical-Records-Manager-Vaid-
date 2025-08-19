import { Toaster } from "@/components/ui/sonner";
const MarketingLayout =({
    children
}:{
    children:React.ReactNode;
})=>{
    
    return(
        // <div className="h-full dark:bg-[#1F1F1F]">
        <div className="dark:bg-[#1F1F1F]">
            <main className="h-full pt-40">
                {children}
                <Toaster position="top-center" duration={2000}  />
            </main>
        </div>

    );
}
export default MarketingLayout