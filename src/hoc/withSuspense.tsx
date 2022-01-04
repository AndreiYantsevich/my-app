import React, {Suspense} from 'react';
import Preloader from '../components/common/Preloader/Preloader';


export const withSuspense = <P extends object>(Component: React.ComponentType<P>) => {
    return (props: P) => {
        return <Suspense fallback={<Preloader/>}> <Component {...props} /> </Suspense>
    }

}