export function useObservable(observable) {
  const initialValue = observable();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const subscription = observable.subscribe(data => setValue(data));
    return subscription.dispose();
  }, [observable]);

  return value;
}