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
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    surname: z.string(),
    gender: z.string(),
    code_ih: z.string(),
    date_of_birth: z.date(),
    nationality: z.string(),
    native_language: z.string(),
    rfc: z.string(),
    curp: z.string(),
    join_date: z.date(),
    quit_date: z.date(),
    email: z.string(),
    mobile: z.string(),
    phone_number: z.string(),
    phone_number_2: z.string(),
    address: z.string(),
    neighborhood: z.string(),  
    city: z.string(),
    state: z.string(),
    zip_code: z.string(),
    comments: z.string(),
})

export default function NewTeacher() {
    const supabase = jsClient
    
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            surname: "",
            gender: "",
            code_ih: "",
            nationality: "",
            native_language: "",
            rfc: "",
            curp: "",
            email: "",
            mobile: "",
            phone_number: "",
            phone_number_2: "",
            address: "",
            neighborhood: "",
            city: "",
            state: "",
            zip_code: "",
            comments: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)

        try {
            const result = await supabase.from('teachers').insert({
                name: values.name,
                surname: values.surname,
                gender: values.gender,
                code_ih: values.code_ih,
                date_of_birth: values.date_of_birth,
                nationality: values.nationality,
                native_language: values.native_language,
                rfc: values.rfc,
                curp: values.curp,
                join_date: values.join_date,
                quit_date: values.quit_date,
                email: values.email,
                mobile: values.mobile,
                phone_number: values.phone_number,
                phone_number_2: values.phone_number_2,
                address: values.address,
                neighborhood: values.neighborhood,
                city: values.city,
                state: values.state,
                zip_code: values.zip_code,
                comments: values.comments
            })
        } catch (error) {
            console.log("Error:")
            console.error
        }
    }

    return(
        <main className='w-full'>
            <Sidebar/>
            <div className='page-container w-full min-h-screen pl-52'>

                <UtilityBar/>

                <div className='w-full flex justify-center content px-8 py-7'>
                    <div className='conent-container w-full max-w-5xl'>
                        
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>

                                {/* Form header and submit button */}
                                <div className='header-container flex justify-between items-center mb-6 w-full'>
                                    <div className='text-xl font-semibold flex items-center'>
                                        <ArrowBackRoundedIcon className='mr-2'/>
                                        New Teacher 
                                    </div> 
                                    <Button type="submit" className='px-4 py-2 bg-ih-blue text-white rounded-lg'>Save teacher</Button>
                                </div>

                                {/* Form */}
                                <div className='form-container flex gap-4'>

                                    <div className='left-section flex flex-col gap-4 w-2/3'>

                                        {/* Teacher Information Section */}
                                        <div className='teacher-information flex flex-col gap-3 w-full bg-white rounded-lg p-5'>
                                            <div className='text-lg font-semibold'>Teacher Information</div>
                                            <div className='fields w-full flex flex-col gap-3'>

                                                <div className='field-row flex items-center gap-4'>
                                                    {/* Client name field */}
                                                    <div className='flex-1'>
                                                        <FormField
                                                            control={form.control}
                                                            name="name"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                <FormLabel>Name</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Your client's name" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>

                                                    {/* Client surname field */}
                                                    <div className='flex-1'>
                                                        <FormField
                                                            control={form.control}
                                                            name="surname"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                <FormLabel>Surname</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Your client's surname" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                </div>

                                                <div className='field-row flex gap-4'>

                                                    {/* Client type field */}
                                                    <div className='flex-1'>
                                                        <FormField
                                                            control={form.control}
                                                            name="gender"
                                                            render={({ field }) => (
                                                                <FormItem >
                                                                    <FormLabel>Gender</FormLabel>
                                                                    <Select onValueChange={field.onChange}>
                                                                        <FormControl>
                                                                            <SelectTrigger>
                                                                                <SelectValue placeholder="Select your gender"/>
                                                                            </SelectTrigger>
                                                                        </FormControl>
                                                                        <SelectContent className='bg-white'>
                                                                            <SelectItem value="Male">Male</SelectItem>
                                                                            <SelectItem value="Female">Female</SelectItem>
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
                                                            name="code_ih"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                <FormLabel>CODEIH</FormLabel>
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
                                                    {/* Date Of Birth field */}
                                                    <div className='flex-1'>
                                                        <FormField
                                                            control={form.control}
                                                            name="date_of_birth"
                                                            render={({ field }) => (
                                                                <FormItem className="flex flex-col">
                                                                    <FormLabel>Date of birth</FormLabel>
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

                                                    {/* Nationality field */}
                                                    <div className='flex-1'>
                                                        <FormField
                                                            control={form.control}
                                                            name="nationality"
                                                            render={({ field }) => (
                                                                <FormItem >
                                                                    <FormLabel>Nationality</FormLabel>
                                                                    <Select onValueChange={field.onChange}>
                                                                        <FormControl>
                                                                            <SelectTrigger>
                                                                                <SelectValue placeholder="Select your gender"/>
                                                                            </SelectTrigger>
                                                                        </FormControl>
                                                                        <SelectContent className='bg-white'>
                                                                            <SelectItem value="Mexican">Mexican</SelectItem>
                                                                            <SelectItem value="American">American</SelectItem>
                                                                            <SelectItem value="Other">Other</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>

                                                    {/* Native Language field */}
                                                    <div className='flex-1'>
                                                        <FormField
                                                            control={form.control}
                                                            name="native_language"
                                                            render={({ field }) => (
                                                                <FormItem >
                                                                    <FormLabel>Native Language</FormLabel>
                                                                    <Select onValueChange={field.onChange}>
                                                                        <FormControl>
                                                                            <SelectTrigger>
                                                                                <SelectValue placeholder="Select your gender"/>
                                                                            </SelectTrigger>
                                                                        </FormControl>
                                                                        <SelectContent className='bg-white'>
                                                                            <SelectItem value="Spanish">Spanish</SelectItem>
                                                                            <SelectItem value="English">English</SelectItem>
                                                                            <SelectItem value="French">French</SelectItem>
                                                                            <SelectItem value="German">German</SelectItem>
                                                                            <SelectItem value="Other">Other</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                </div>

                                                <div className='field-row flex items-center gap-4'>
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

                                                    {/* CURP field */}
                                                    <div className='flex-1'>
                                                        <FormField
                                                            control={form.control}
                                                            name="curp"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                <FormLabel>CURP</FormLabel>
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

                                                    {/* Quit Date field */}
                                                    <div className='flex-1'>
                                                        <FormField
                                                            control={form.control}
                                                            name="quit_date"
                                                            render={({ field }) => (
                                                                <FormItem className="flex flex-col">
                                                                    <FormLabel>Quit Date</FormLabel>
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
                                        <div className='contact-information flex flex-col gap-3 w-full bg-white rounded-lg p-5'>
                                            <div className='text-lg font-semibold'>Contact Information</div>

                                            <div className='fields w-full flex flex-col gap-3'>

                                                <div className='field-row flex items-center gap-4'>
                                                    {/* Emailfield */}
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

                                                    {/* Mobile field */}
                                                    <div className='flex-1'>
                                                        <FormField
                                                            control={form.control}
                                                            name="mobile"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                <FormLabel>Mobile Number</FormLabel>
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

                                                    {/* Phone number 2 field */}
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
                                                    {/* Address field */}
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

                                                    {/* Neighborhood field */}
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
                                                    {/* City field */}
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

                                                    {/* State field */}
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

                                                    {/* Zip Code field */}
                                                    <div className='flex-1'>
                                                        <FormField
                                                            control={form.control}
                                                            name="zip_code"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                <FormLabel>Zip code</FormLabel>
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
                                                name="comments"
                                                render={({ field }) => (
                                                    <FormItem>
                                                    <FormLabel>General Comments</FormLabel>
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