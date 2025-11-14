

const ErrorPage = ({ children }) => {
    return (
        <main className="main-content">
            <h1>ERROR</h1>
            <h3>Something unexpected happened.</h3>
            
            <div>{children}</div>
        </main>
    );
};

export default ErrorPage;