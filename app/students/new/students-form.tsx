"use client"

import { jsClient } from '@/utils/supabase/form-server';

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
import { useEffect, useState } from 'react';

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    surname: z.string(),
    gender: z.string(),
    nationality: z.string(),
    date_of_birth: z.date(),
    client_id: z.string(),
    mobile: z.string(),
    email: z.string(),
    phone_number: z.string(),
    phone_number_2: z.string(),
    comments: z.string(),
})

export default function StudentsForm({ clients }: any){
    const supabase = jsClient
    
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            surname: "",
            gender: "",
            nationality: "",
            mobile: "",
            email: "",
            phone_number: "",
            phone_number_2: "",
            comments: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        console.log(clients)
    }

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

                {/* Form header and submit button */}
                <div className='header-container flex justify-between items-center mb-6 w-full'>
                    <div className='text-xl font-semibold flex items-center'>
                        <ArrowBackRoundedIcon className='mr-2'/>
                        New Student 
                    </div> 
                    <Button type="submit" className='px-4 py-2 bg-ih-blue text-white rounded-lg'>Save student</Button>
                </div>

                {/* Form */}
                <div className='form-container flex gap-4'>

                    <div className='left-section flex flex-col gap-4 w-2/3'>

                        {/* Student Information Section */}
                        <div className='student-information flex flex-col gap-3 w-full bg-white rounded-lg p-5'>
                            <div className='text-lg font-semibold mb-5'>Student Information</div>

                            <div className='fields w-full flex flex-col gap-3'>

                                <div className='field-row flex items-center gap-4'>
                                    {/* Student name field */}
                                    <div className='flex-1'>
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Your student's name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Student surname field */}
                                    <div className='flex-1'>
                                        <FormField
                                            control={form.control}
                                            name="surname"
                                            render={({ field }) => (
                                                <FormItem>
                                                <FormLabel>Surname</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Your student's name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className='field-row flex gap-4'>
                                    {/* Gender field */}
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
                                                                <SelectValue placeholder="Select the gender"/>
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
                                                                <SelectValue placeholder="Select nationality"/>
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

                                    {/* Client type field */}
                                    <div className='flex-1'>
                                        <FormField
                                            control={form.control}
                                            name="client_id"
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
                                                            {clients.map((client: any) => {
                                                                return(
                                                                    <SelectItem value={client.client_id.toString()}>
                                                                        {client.client_name}
                                                                    </SelectItem>
                                                                )
                                                            })}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className='field-row flex items-center gap-4'>
                                    {/* Student email field */}
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

                                    {/* Student mobile field */}
                                    <div className='flex-1'>
                                        <FormField
                                            control={form.control}
                                            name="mobile"
                                            render={({ field }) => (
                                                <FormItem>
                                                <FormLabel>Mobile</FormLabel>
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
                                    {/* Phone number field */}
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

                                    {/*  Phone number 2 field */}
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

                            </div>
                        </div>

                    </div>

                    <div className='comments-section w-1/3 bg-white rounded-lg p-5 h-min flex flex-col gap-5'>
                        <div className='text-lg font-semibold'>Comments</div>
                        <div className='flex flex-col gap-3'>
                            {/* Comments */}        
                            <FormField
                                control={form.control}
                                name="comments"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Comments</FormLabel>
                                    <FormControl>
                                        <Textarea
                                        placeholder="Additional information"
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
    )
}