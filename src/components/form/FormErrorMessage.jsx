export default function FormErrorMessage({ error, clasName }){
  return (
    <div className={`${clasName} text-sm mt-2 tracking-wide font-light text-red-400`}>
      {error && <p>{error}</p>}
    </div>
  );
}