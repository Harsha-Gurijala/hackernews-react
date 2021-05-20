import { useEffect, useRef } from 'react';

export const usePreventSetStateOnUnmount = () => {

    /*Use this variable to prevent setting state on unmounted component, which
    happens when a user quickly clicks on different links on the navbar :*/
    const isMounted = useRef(true);

    /*If the component is unmounted before getStories function gets its data,
    we abort fetching data with Abort controler, also preventing state update */
    const abortController = new AbortController();

    const abortSignal = abortController.signal;

    // If a user quickly clicks or navigates between navbar links:
    useEffect(() => {
        return () => {
            abortController.abort();
            isMounted.current = false
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        isMounted,
        abortController,
        abortSignal
    }

}