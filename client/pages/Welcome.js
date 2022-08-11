export function Welcome({ displayName }) {
    return (
        <div className="flex h-[5%] w-[90%] place-self-center place-items-center place-content-center bg-green-500 shadow-lg rounded-lg">
            <h1 className="text-center font-bold ">Welcome {displayName}</h1>
        </div>
    );
}
