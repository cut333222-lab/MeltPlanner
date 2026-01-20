
import React from 'react';
import { MarketingAction, FunnelStage } from '../types';
import { FUNNEL_COLORS } from '../constants';

interface TaskCardProps {
  action: MarketingAction;
  onClick: (action: MarketingAction) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ action, onClick }) => {
  return (
    <div 
      onClick={() => onClick(action)}
      className={`p-2.5 md:p-3 rounded-lg border cursor-pointer transition-all hover:bg-opacity-80 active:scale-95 ${FUNNEL_COLORS[action.stage]} shadow-lg flex-1 flex flex-col justify-between`}
    >
      <div>
        <div className="flex justify-between items-start mb-1">
          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-tighter opacity-70">
            {action.stage}
          </span>
          <div className="flex gap-0.5">
            {action.channels.slice(0, 3).map(c => (
              <div key={c} className="w-1 h-1 rounded-full bg-current opacity-40" />
            ))}
          </div>
        </div>
        <h4 className="text-[11px] md:text-sm font-bold leading-tight line-clamp-2 md:line-clamp-3">
          {action.title}
        </h4>
      </div>
      <p className="text-[9px] mt-2 opacity-50 font-bold truncate">
        {action.channels[0]}{action.channels.length > 1 ? ` +${action.channels.length - 1}` : ''}
      </p>
    </div>
  );
};

export default TaskCard;
