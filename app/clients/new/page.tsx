"use client"

import { jsClient } from '@/utils/supabase/form-server';

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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';

const formSchema = z.object({
    client_name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    client_type: z.string(),
    rfc: z.string(),
    join_date: z.date(),
    termination_date: z.date(),
    legal_representative: z.string(),
    email: z.string(),
    website: z.string(),
    phone_number: z.string(),
    phone_number_2: z.string(),
    address: z.string(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
    zip_code: z.string(),
    business: z.string(),
    comments: z.string(),
})

export default function NewClient() {
    const supabase = jsClient
    
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            client_name: "",
            client_type: "",
            rfc: "",
            legal_representative: "",
            email: "",
            website: "",
            phone_number: "",
            phone_number_2: "",
            address: "",
            neighborhood: "",
            city: "",
            state: "",
            zip_code: "",
            business: "",
            comments: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        console.log("<----------->")
        try {
            const result = await supabase.from('clients').insert({
                client_name: values.client_name,
                client_type: values.client_type,
                rfc: values.rfc,
                join_date: values.join_date,
                termination_date: values.termination_date,
                legal_representative: values.legal_representative,
                email: values.email,
                website: values.website,
                phone_number: values.phone_number,
                phone_number_2: values.phone_number_2,
                address: values.address,
                neighborhood: values.neighborhood,
                city: values.city,
                state: values.state,
                zip_code: values.zip_code,
                business: values.business,
                comments: values.comments,
            })
        } catch (error) {
            console.log("Error:")
            console.error
        }
    }
 
    return (
        <main className='w-full'>
            <Sidebar/>
            <div className='page-container w-full min-h-screen pl-52'>
        
                <UtilityBar/>

                <div className='w-full flex justify-center content px-8 py-7'>
                    <div className='content-container w-full max-w-5xl'>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>

                             {/* Form header and submit button */}
                             <div className='header-container flex justify-between items-center mb-6 w-full'>
                                <div className='text-xl font-semibold flex items-center'>
                                    <ArrowBackRoundedIcon className='mr-2'/>
                                    New Client 
                                </div> 
                                <Button type="submit" className='px-4 py-2 bg-ih-blue text-white rounded-lg'>Save client</Button>
                            </div>

                            {/* Form */}
                            <div className='form-container flex gap-4'>

                                <div className='left-section flex flex-col gap-4 w-2/3'>

                                    {/* Client Information Section */}

                                    <div className='client-information flex flex-col gap-3 w-full bg-white rounded-lg p-5'>
                                        <div className='text-lg font-semibold mb-5'>Client Information</div>
                                        <div className='fields w-full flex flex-col gap-3'>

                                            {/* Client name field */}
                                            <FormField
                                                control={form.control}
                                                name="client_name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                    <FormLabel>Client name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Your client's name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <div className='field-row flex items-center gap-4'>

                                                {/* Client type field */}
                                                <div className='flex-1'>
                                                    <FormField
                                                        control={form.control}
                                                        name="client_type"
                                                        render={({ field }) => (
                                                            <FormItem >
                                                                <FormLabel>Client type</FormLabel>
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
                                                </div>
                                                
                                                {/* RFC field */}
                                                <div className='flex-1'>
                                                    <FormField
                                                        control={form.control}
                                                        name="rfc"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                            <FormLabel>RFC</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                            </div>

                                            <div className='field-row flex items-center gap-4'>

                                                {/* Join Date field */}
                                                <div className='flex-1'>
                                                    <FormField
                                                        control={form.control}
                                                        name="join_date"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-col">
                                                                <FormLabel>Join Date</FormLabel>
                                                                <Popover>
                                                                    <PopoverTrigger asChild>
                                                                    <FormControl>
                                                                        <Button
                                                                        variant={"outline"}
                                                                        className={cn(
                                                                            "pl-3 text-left font-normal",
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
                                                    /> 
                                                </div>

                                                {/* Termination Date field */}
                                                <div className='flex-1'>
                                                    <FormField
                                                        control={form.control}
                                                        name="termination_date"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-col">
                                                                <FormLabel>Termination Date</FormLabel>
                                                                <Popover>
                                                                    <PopoverTrigger asChild>
                                                                    <FormControl className='flex-1'>
                                                                        <Button
                                                                        variant={"outline"}
                                                                        className={cn(
                                                                            "pl-3 text-left font-normal",
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
                                                    /> 
                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                    {/* Contact Information Section */}

                                    <div className='contact-information w-full bg-white rounded-lg p-5'>
                                    <div className='text-lg font-semibold mb-5'>Contact Information</div>
                                        <div className='fields w-full flex flex-col gap-3'>

                                            {/* Client name field */}
                                            <FormField
                                                control={form.control}
                                                name="legal_representative"
                                                render={({ field }) => (
                                                    <FormItem>
                                                    <FormLabel>Legal representative</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <div className='field-row flex items-center gap-4'>
                                                {/* Email field */}
                                                <div className='flex-1'>
                                                    <FormField
                                                        control={form.control}
                                                        name="email"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                            <FormLabel>Email</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                                {/* Website */}
                                                <div className='flex-1'>
                                                    <FormField
                                                        control={form.control}
                                                        name="website"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                            <FormLabel>Website</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>

                                            <div className='field-row flex items-center gap-4'>
                                                {/* Phone number 1 */}
                                                <div className='flex-1'>
                                                    <FormField
                                                        control={form.control}
                                                        name="phone_number"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                            <FormLabel>Phone number</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                {/* Phone number 2 */}
                                                <div className='flex-1'>
                                                    <FormField
                                                        control={form.control}
                                                        name="phone_number_2"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                            <FormLabel>Phone number 2</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>

                                            <div className='field-row flex items-center gap-4'>
                                                {/* Address */}
                                                <div className='flex-1'>
                                                    <FormField
                                                        control={form.control}
                                                        name="address"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                            <FormLabel>Address (street and number)</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                {/* Neighborhood */}
                                                <div className='flex-1'>
                                                    <FormField
                                                        control={form.control}
                                                        name="neighborhood"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                            <FormLabel>Neighborhood</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>

                                            <div className='field-row flex items-center gap-4'>
                                                {/* City */}
                                                <div className='flex-1'>
                                                    <FormField
                                                        control={form.control}
                                                        name="city"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                            <FormLabel>City</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                {/* State */}
                                                <div className='flex-1'>
                                                    <FormField
                                                        control={form.control}
                                                        name="state"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                            <FormLabel>State</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                {/* Zip Code */}
                                                <div className='flex-1'>
                                                    <FormField
                                                        control={form.control}
                                                        name="zip_code"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                            <FormLabel>Zip Code</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                                <div className='comments-section w-1/3 bg-white rounded-lg p-5 h-min flex flex-col gap-5'>
                                    <div className='text-lg font-semibold'>Comments</div>
                                    <div className='flex flex-col gap-3'>

                                        {/* Business Information */}        
                                        <FormField
                                            control={form.control}
                                            name="business"
                                            render={({ field }) => (
                                                <FormItem>
                                                <FormLabel>Business information</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                    placeholder="Tell us about the business"
                                                    className="resize-none"
                                                    {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Comments */}        
                                        <FormField
                                            control={form.control}
                                            name="comments"
                                            render={({ field }) => (
                                                <FormItem>
                                                <FormLabel>Comments</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                    placeholder="Tell us about the business"
                                                    className="resize-none"
                                                    {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                    </div>
                                </div>

                            </div>

                        </form>
                    </Form>

                    </div>
                </div>
                
            </div>
        </main>
    )
}