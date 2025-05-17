const CartButton = ({setIsCartVisible,cart})=>{
    return(
        <button 
        className='bg-blue-600 rounded-full w-12 h-12 flex justify-center items-center hover:bg-blue-700 transition-colors cursor-pointer'
        onClick={() => setIsCartVisible(true)}
        >
        <div className="flex flex-col items-center">
        <span className="text-xs mt-0.5">{cart.length}</span>
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
        >
            <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
            />
        </svg>
        </div>
        </button>
    );
}
export default CartButton;