
interface ErrorMessageProps {
    message: string | undefined;
}
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
    <p className="text-red-500 text-sm mt-1">{message}</p>
);

export default ErrorMessage;