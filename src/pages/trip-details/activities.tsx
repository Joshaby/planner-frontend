import { CircleCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../lib/axios';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Activity {
  date: string;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
  }[];
}

export const Activities = () => {
  const { tripId } = useParams();
  const [activities, setActivities] = useState<Activity[] | undefined>();

  useEffect(() => {
    api.get(`/trips/${tripId}/activities`).then((response) => setActivities(response.data.activities));
  }, [tripId]);

  return (
    <div className="space-y-8">
      {activities?.map((activity: Activity) => (
        <div key={activity.date} className="space-y-2.5">
          <div className="flex gap-2 items-baseline">
            <span className="text-xl text-zinc-300 font-semibold">Dia {format(activity.date, 'dd')}</span>
            <span className="text-xs text-zinc-500">{format(activity.date, 'EEEE', { locale: ptBR })}</span>
          </div>
          {activity.activities.length === 0 ? (
            <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>
          ) : (
            <div>
              {activity.activities.map((activity1) => (
                <div key={activity1.id} className="space-y-2.5">
                  <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                    <CircleCheck className="size-5 text-lime-300" />
                    <span className="text-zinc-100">{activity1.title}</span>
                    <span className="text-zinc-400 text-sm ml-auto">{format(activity1.occurs_at, 'HH:mm')}h</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
