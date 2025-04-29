import clsx from "clsx";

const BASE_STYLES = "rounded font-medium focus:outline-none transition-colors focus:ring-2 focus:ring-offset-2";
type ButtonProps = {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
    isDisabled?: boolean;
};

export default function Button({
    children,
    variant = "primary",
    size = "md",
    isDisabled = false,
}: ButtonProps) {

    const buttonClasses = clsx(
        BASE_STYLES,

        // 버튼 크기 (size)
        {
            "px-3 py-1 text-sm": size === "sm",
            "px-4 py-2 text-base": size === "md",
            "px-6 py-3 text-lg": size === "lg",
        },

        // 버튼 변형 (variant)
        {
            "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500":
                variant === "primary",
            "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500":
                variant === "secondary",
            "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500":
                variant === "outline",
        },

        // 비활성화 상태
        isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
    );

    return (
        <button className={buttonClasses} disabled={isDisabled}>
            {children}
        </button>
    );
};