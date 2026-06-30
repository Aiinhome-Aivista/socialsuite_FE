import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Calendar as CalendarIcon, Sparkles } from "lucide-react";
import { api } from "../lib/api";
import { useOrg } from "../lib/useOrg";

export default function Calendar() {
  const orgId = useOrg();
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    if (!orgId) return;
    api.listPosts(orgId).then((posts) => {
      setEvents(
        posts
          .filter((p) => p.scheduled_at)
          .map((p) => ({
            id: String(p.id),
            title: p.body?.slice(0, 30) || "(untitled)",
            start: p.scheduled_at,
            extendedProps: { status: p.status },
            backgroundColor: p.status === "published" ? "#10b981" : undefined,
            borderColor: p.status === "published" ? "#059669" : undefined,
          }))
      );
    });
  }, [orgId]);


  async function onEventClick(info: any) {
    const status = info.event.extendedProps.status;
    const start = info.event.start;
    
    if (status !== 'scheduled') {
      alert(`Cannot delete a post that is ${status}.`);
      return;
    }

    if (start && new Date(start) < new Date()) {
      alert("Cannot delete a post whose scheduled time has passed.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this scheduled post?")) {
      try {
        await api.deletePost(Number(info.event.id));
        info.event.remove();
      } catch (e: any) {
        alert(e.message);
      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-500 ease-in-out opacity-100 translate-y-0">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-50 to-blue-100 text-indigo-600 rounded-xl shadow-sm border border-indigo-100/50">
              <CalendarIcon className="w-7 h-7" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              Content Calendar
            </span>
          </h1>
          <p className="mt-2 text-sm text-gray-500 flex items-center gap-2 font-medium ml-1">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Manage and schedule your social media posts with ease
          </p>
        </div>
      </div>
      
      <div className="bg-white/80 rounded-3xl shadow-xl shadow-indigo-900/5 border border-indigo-50 p-6 md:p-8 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-900/10">
        <div className="calendar-container">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            editable={false}
            events={events}
            eventClick={onEventClick}
            height="auto"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,dayGridWeek'
            }}
            dayMaxEvents={true}
          />
        </div>
      </div>
    </div>
  );
}
