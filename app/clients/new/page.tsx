"use client"

import Sidebar from '@/app/uiComponents/sidebar';
import UtilityBar from '@/app/uiComponents/utilityBar';

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';

const formSchema = z.object({
    clientName: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    clientType: z.string(),
    rfc: z.string(),
    joinDate: z.string(),
    terminationDate: z.string().optional(),
    address: z.string(),
    neighbourhood: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    business: z.string(),
    legalRepresentative: z.string(),
    phoneNumber: z.string(),
    phoneNumber2: z.string(),
    email: z.string().email(),
    clientStatus: z.string(),
    comments: z.string(),
})

export default function NewClient() {

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            clientName: "",
            clientType: "",
            rfc: "",
            joinDate: "",
            terminationDate: "",
            address: "",
            neighbourhood: "",
            city: "",
            state: "",
            zipCode: "",
            business: "",
            legalRepresentative: "",
            phoneNumber: "",
            phoneNumber2: "",
            email: "",
            clientStatus: "",
            comments: ""
        },
    })

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }
 
    return (
        <main className='w-full'>
            <Sidebar/>
            <div className='page-container w-full min-h-screen pl-52'>
        
                <UtilityBar/>

                <div className='w-full flex justify-center content px-8 py-7'>
                    <div className='content-container w-full max-w-2xl'>

                        <div className='text-xl font-semibold flex items-center mb-6'>
                            <ArrowBackRoundedIcon className='mr-2'/>
                            New Client 
                        </div> 

                        {/* -- Empieza formulario -- */}

                        <div className='first-part-form rounded-md bg-white w-full min-h-10 p-5'>
                            <div className='text-lg font-medium mb-5'>
                                Client Information
                            </div>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="clientName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Client name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="clientType"
                                        render={({ field }) => (
                                            <FormItem >
                                                <FormLabel>Client Type</FormLabel>
                                                <Select onValueChange={field.onChange}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a client type"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className='bg-white'>
                                                        <SelectItem value="Company">Company</SelectItem>
                                                        <SelectItem value="School">School</SelectItem>
                                                        <SelectItem value="Personal">Personal</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {/* <FormField
                                        control={form.control}
                                        name="rfc"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>RFC</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="RFC" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="joinDate"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Join Date</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                        >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        className='bg-white'
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                        }
                                                        initialFocus
                                                    />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    /> */}
                                    {/* <FormField
                                        control={form.control}
                                        name="terminationDate"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Termination Date</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                        >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        className='bg-white'
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                        }
                                                        initialFocus
                                                    />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    /> */}
                                    <Button type="submit">Submit</Button> 
                                </form>
                            </Form>
                        </div>

                        {/* -- Termina formulario -- */}

                    </div>
                </div>
                
            </div>
        </main>
    )
}