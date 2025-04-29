import clsx from "clsx";
type CardProps = {
    children: React.ReactNode;
    variant?: "default" | "outlined" | "elevated";
    padding?: "none" | "sm" | "md" | "lg";
    radius?: "none" | "sm" | "md" | "lg" | "full";
    className?: string
};

export default function Card({
    children,
    variant = "default",
    padding = "md",
    radius = "md",
    className
}: CardProps) {
    const cardClasses = clsx(
        "overflow-hiddden transition-all",

        // padding
        {
            "p-0": padding === "none",
            "p-3": padding === "sm",
            "p-5": padding === "md",
            "p-8": padding === "lg",
        },

        // radius
        {
            "rounded-none": radius === "none",
            "rounded-sm": radius === "sm",
            "rounded-md": radius === "md",
            "rounded-lg": radius === "lg",
            "rounded-full": radius === "full",
        },
        
        // variant
        {
            "bg-white border border-gray-200" : variant === "default",
            "bg-white border border-gray-600 hover:border-purple-600" : variant === "outlined",
            "bg-white shadow hover:shadow-xl " : variant === "elevated"
        },

        className

    );

    return (

        <div className={cardClasses}>
            {children}
        </div>
    )
}
