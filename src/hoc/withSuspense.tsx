import React, {ComponentType, Suspense} from 'react';
import Preloader from '../components/common/Preloader/Preloader';

export function withSuspense<WCP>(WrappedComponent: ComponentType<WCP>) {
    return (props: any) => {
        let {...restProps} = props
        return (
            <Suspense fallback={<Preloader/>}>
                <WrappedComponent {...restProps as WCP}/>
            </Suspense>
        )
    }
}