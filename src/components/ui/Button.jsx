export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const base = 'inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors';
    const variants = {
        primary: 'bg-[#84ba3f] text-white hover:bg-[#6ea032]',
        secondary: 'bg-[#006600] text-white hover:bg-[#004d00]',
        outline: 'border-2 border-[#84ba3f] text-[#84ba3f] hover:bg-[#84ba3f] hover:text-white',
    };
    return (
        <button className={`${base} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};