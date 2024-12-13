import React from 'react';
import { Form, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

import { profileSchema, skillsList, interestsList } from '../../schemas/schema'
import { Label } from '../ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { MultiSelect } from '../MultiSelect';


export const ProfileForm = ({ onSubmit, defaultValues }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            skills: [],
            interests: [],
            ...defaultValues,
        },
    });

    const skills = watch('skills');
    const interests = watch('interests');

    return (
        <Form>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        {...register('name')}
                        className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                        <p className="text-sm text-red-500">{errors.name.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="mentee">Mentee</SelectItem>
                            <SelectItem value="mentor">Mentor</SelectItem>

                        </SelectContent>
                    </Select>

                    {errors.role && (
                        <p className="text-sm text-red-500">{errors.role.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input
                        id="bio"
                        {...register('bio')}
                        className={errors.bio ? 'border-red-500' : ''}
                    />
                    {errors.bio && (
                        <p className="text-sm text-red-500">{errors.bio.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="skills">Skills</Label>
                    <MultiSelect
                        id="skills"
                        value={skills}
                        onChange={(value) => setValue('skills', value)}
                        options={skillsList}
                    />
                    {errors.skills && (
                        <p className="text-sm text-red-500">{errors.skills.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="interests">Interests</Label>
                    <MultiSelect
                        id="interests"
                        value={interests}
                        onChange={(value) => setValue('interests', value)}
                        options={interestsList}
                    />
                    {errors.interests && (
                        <p className="text-sm text-red-500">{errors.interests.message}</p>
                    )}
                </div>

                <Button type="submit" className="w-full">
                    Save Profile
                </Button>
            </form>
        </Form>
    );
};