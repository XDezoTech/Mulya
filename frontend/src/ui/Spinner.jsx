const Spinner = () => {
  return (
    <div
      className="m-12 h-16 w-16 animate-spin rounded-full bg-[radial-gradient(farthest-side,var(--tw-gradient-from)_94%,transparent)_top/10px_10px_no-repeat,conic-gradient(transparent_30%,var(--tw-gradient-from))] mask-[radial-gradient(farthest-side,transparent_calc(100%-10px),black_0)]"
      style={{
        '--tw-gradient-from': 'var(--color-brand-600)',
      }}
    ></div>
  );
};

export default Spinner;
