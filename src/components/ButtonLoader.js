import React from 'react'
import { BarLoader, BeatLoader, BounceLoader, CircleLoader, ClimbingBoxLoader, ClipLoader, ClockLoader, DotLoader, FadeLoader, GridLoader, HashLoader, MoonLoader, PacmanLoader, PropagateLoader, PuffLoader, PulseLoader, RingLoader, RiseLoader, RotateLoader, ScaleLoader, SyncLoader } from "react-spinners";

function ButtonLoader() {
    return (
        <div>
            {/* BarLoader<BarLoader />
            BeatLoader<BeatLoader />
            BounceLoader<BounceLoader />
            CircleLoader<CircleLoader />
            ClimbingBoxLoader<ClimbingBoxLoader />
            ClipLoader<ClipLoader />
            ClockLoader<ClockLoader />
            DotLoader<DotLoader />
            FadeLoader<FadeLoader />
            GridLoader<GridLoader />
            HashLoader<HashLoader />
            MoonLoader<MoonLoader />
            PacmanLoader<PacmanLoader />
            PropagateLoader<PropagateLoader />
            PuffLoader<PuffLoader /> */}
            <PulseLoader color='#404040' size={5} />
            {/* RingLoader<RingLoader	/>
            RiseLoader<RiseLoader />
            RotateLoader<RotateLoader />
            ScaleLoader<ScaleLoader />
            SyncLoader<SyncLoader	/> */}
        </div>
    )
}

export default ButtonLoader