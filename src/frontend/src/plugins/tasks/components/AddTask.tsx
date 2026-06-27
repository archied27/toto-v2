import { Card } from "@/components/ui/card";
import { useGetTaskLabels, useGetTaskLists, type Task, type TaskList, type Label } from "../useTasks";
import { CheckIcon, PlusIcon, ScrollTextIcon, TagIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import AddLabelList from "./AddLabelList";

export default function AddTask({ onClose }: { onClose?: () => void }) {
    const lists = useGetTaskLists();
    const labels = useGetTaskLabels();

    return (
        <Card className="w-full max-w-md overflow-hidden border border-border/50">
            <div className="flex items-center justify-between px-5">
                <XIcon className="h-5 w-5" onClick={onClose} />
                <h2 className="text-base font-semibold text-foreground">Add Task</h2>
                <CheckIcon className="h-5 w-5" />
            </div>
            
            <div className="px-3 flex flex-col gap-3 w-full">
                <Input placeholder="What needs doing?" />
                <Input placeholder="Add a description..." className="min-h-[100px]" />
                <DatePicker placeholder="Do it when?" />
                <DatePicker placeholder="When is it due?" />

                <div className="flex justify-center gap-3 w-full">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant={"outline"}>
                                <ScrollTextIcon className="text-muted-foreground" />
                                <p className="text-muted-foreground">List</p>
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent className="border opacity-90 w-full p-1 gap-1 flex flex-row">
                            {lists.taskLists.map((tList) => (
                                <Button id={tList.id} style={{ backgroundColor: tList.colour }} className="">
                                    <p >{tList.name}</p>
                                </Button>
                            ))}

                            <AddLabelList type="List" onAdd={lists.refetch} />
                        </PopoverContent>
                    </Popover>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant={"outline"}>
                                <TagIcon className="text-muted-foreground" />
                                <p className="text-muted-foreground">Label</p>
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent className="border opacity-90 w-full p-1 gap-1 flex flex-row">
                            {labels.taskLabels.map((tLabels) => (
                                <Button id={tLabels.id} style={{ backgroundColor: tLabels.colour }}>
                                    <p>{tLabels.name}</p>
                                </Button>
                            ))}

                            <AddLabelList type="Label"
                            onAdd={labels.refetch} />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </Card>
    );
}