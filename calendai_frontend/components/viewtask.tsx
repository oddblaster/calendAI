'use client';
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const TaskLink = () => {
    const router = useRouter();
    return (
        <div onClick={() => {router.push('/tasks')}} className="hover:cursor-pointer font-medium text-blue-400 hover:text-blue-300 flex items-center">
                View all tasks
                <ChevronRight className="ml-1 w-4 h-4" />
        </div>);
}

export default TaskLink;