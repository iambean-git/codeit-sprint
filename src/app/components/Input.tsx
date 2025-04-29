import clsx from "clsx";

type InputProps = {
    id?: string;
    type?: string;
    placeholder?: string;
    label?: string;
    error?: string;
    size?: "sm" | "md" | "lg";
    variant?: "default" | "filled" | "outlined";
    fullWidth?: boolean;
    disabled?: boolean;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
    id,
    type = "text",
    placeholder,
    label,
    error,
    size = "md",
    variant = "default",
    fullWidth = false,
    disabled = false,
    className,
    onChange
}: InputProps) {

    const inputWrapperClasses = clsx(
        // 전체 너비 설정
        fullWidth && "w-full",
    );

    const labelClasses = clsx(
        "block mb-2 font-medium",
        {
            "text-sm": size === "sm",
            "text-base": size === "md",
            "text-lg": size === "lg",
        },
        disabled && "text-gray-400",
        error && "text-red-600",
    );

    const errorClasses = "mt-1 text-sm text-red-600";
    const inputClasses = clsx(
        "border w-full rounded-md transition-all focus:outline-none focus:ring-2",

        //size
        {
            "px-2 py-1 text-sm": size === "sm",
            "px-3 py-2 text-md": size === "md",
            "px-4 py-3 text-lg": size === "lg",
        },

        // 변형별 스타일 (variant)
        {
            "border-gray-300 focus:border-blue-500 focus:ring-blue-200":
                variant === "default" && !error,
            "border-transparent bg-gray-100 focus:bg-white focus:border-blue-500 focus:ring-blue-200":
                variant === "filled" && !error,
            "border-gray-300 bg-transparent focus:border-blue-500 focus:ring-blue-200":
                variant === "outlined" && !error,
        },

        // 에러 상태
        error && "border-red-500 focus:border-red-500 focus:ring-red-200",

        // 비활성화 상태
        disabled && "bg-gray-100 text-gray-400 cursor-not-allowed",

        // 사용자 정의 클래스
        className,
    );

    return (
        <div className={inputWrapperClasses}>
            {label &&
                <label htmlFor={id} className={labelClasses}
                >
                    {label}
                </label>
            }
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                onChange={onChange}
                className={inputClasses}
            >
            </input>
            {error && <p className={errorClasses}>{error}</p>}
        </div>
    )
}
