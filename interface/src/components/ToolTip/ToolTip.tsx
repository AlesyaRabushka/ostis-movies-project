import { Tooltip, IconButton } from '@mui/material';
import { AddCircle } from '@mui/icons-material';


import "./ToolTip.css"

// export type ToolTipBehaviorType = "hover";
// export type ToolTipPlacementType = "top" | "bottom" | "left" | "right";

// export interface IToolTipProps {
//     behavior?: ToolTipBehaviorType;
//     className?: string;
//     children: ReactNode;
//     content: string;
//     placement: ToolTipPlacementType;
// }


const ToolTip = () =>{

    // const [isHovered, setHovered] = useState(false);

    return (
        <Tooltip title = 'Добавить фильм' className='tooltip'>
            <IconButton>
                <AddCircle fontSize="large" style={{color:'white'}}/>
            </IconButton>
        </Tooltip>
    )
}

export default ToolTip;