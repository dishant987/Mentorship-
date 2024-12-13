import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MultiSelect } from './MultiSelect'
import { useFormStatus } from 'react-dom'

const skillOptions = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'React', value: 'react' },
  { label: 'Node.js', value: 'nodejs' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'C++', value: 'cpp' },
  { label: 'C#', value: 'c#' },
  { label: 'PHP', value: 'php' },
  { label: 'Ruby', value: 'ruby' },
  { label: 'Swift', value: 'swift' },
  { label: 'Go', value: 'go' },
  { label: 'Rust', value: 'rust' },
  { label: 'Kotlin', value: 'kotlin' },
  { label: 'Objective-C', value: 'objective-c' },
  { label: 'Scala', value: 'scala' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'SQL', value: 'sql' },
  { label: 'NoSQL', value: 'nosql' },
  { label: 'GraphQL', value: 'graphql' },
  { label: 'Dart', value: 'dart' },
  { label: 'Flutter', value: 'flutter' },
  { label: 'React Native', value: 'react-native' },
  { label: 'Angular', value: 'angular' },
  { label: 'Vue.js', value: 'vuejs' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Next.js', value: 'nextjs' },
  { label: 'Nuxt.js', value: 'nuxtjs' },
  { label: 'Gatsby', value: 'gatsby' },
  { label: 'Jest', value: 'jest' },
  { label: 'Mocha', value: 'mocha' },
];

const interestOptions = [
  { label: 'Web Development', value: 'web-development' },
  { label: 'Mobile Development', value: 'mobile-development' },
  { label: 'Data Science', value: 'data-science' },
  { label: 'Machine Learning', value: 'machine-learning' },
  { label: 'DevOps', value: 'devops' },
  { label: 'UI/UX Design', value: 'ui-ux-design' },
  { label: 'Cloud Computing', value: 'cloud-computing' },
  { label: 'Artificial Intelligence', value: 'artificial-intelligence' },
  { label: 'Blockchain', value: 'blockchain' },
  { label: 'Cybersecurity', value: 'cybersecurity' },
  { label: 'Game Development', value: 'game-development' },
  { label: 'IoT', value: 'iot' },
  { label: 'Open Source', value: 'open-source' },
  { label: 'Technical Writing', value: 'technical-writing' },
  { label: 'Digital Marketing', value: 'digital-marketing' },
  { label: 'Automation', value: 'automation' },
  { label: 'unit testing', value: 'unit-testing' },
  { label: 'Graphic Design', value: 'graphic-design' },

];

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  bio: z.string().max(500, 'Bio must be 500 characters or less'),
  role: z.enum(['mentee', 'mentor']),
  skills: z.array(z.string()).min(1, 'Select at least one skill'),
  interests: z.array(z.string()).min(1, 'Select at least one interest'),
})



export function CreateProfileForm({ onSubmit,pending }) {
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      bio: '',
      role: '',
      skills: [],
      interests: [],
    },
  })


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="mentee">Mentee</SelectItem>
                  <SelectItem value="mentor">Mentor</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <FormControl>
                <MultiSelect
                  options={skillOptions}
                  selected={field.value}
                  onChange={field.onChange}
                  placeholder="Select skills"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interests</FormLabel>
              <FormControl>
                <MultiSelect
                  options={interestOptions}
                  selected={field.value}
                  onChange={field.onChange}
                  placeholder="Select interests"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={pending} type="submit">Create Profile</Button>
      </form>
    </Form>
  )
}

