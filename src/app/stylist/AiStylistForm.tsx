"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { getPersonalizedStyleSuggestions } from "@/ai/flows/personalized-style-suggestions";
import { Loader2, Sparkles, Upload, ArrowLeft, RefreshCw } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  stylePreference: z.string().min(1, "Please select a style preference."),
  colorPalette: z.string().min(1, "Please select a color palette."),
  occasion: z.string().min(1, "Please select an occasion."),
  bodyTypeDescription: z.string().min(20, "Please describe your body type in at least 20 characters."),
  userPhoto: z.any().refine((file) => file instanceof File, "A photo is required."),
});

type FormValues = z.infer<typeof formSchema>;
type Suggestions = { styleSuggestions: string };

const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export function AiStylistForm() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestions | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        stylePreference: "",
        colorPalette: "",
        occasion: "",
        bodyTypeDescription: "",
        userPhoto: undefined,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setSuggestions(null);

    try {
      const photoDataUri = await fileToDataUri(data.userPhoto);

      const quizAnswers = `Style Preference: ${data.stylePreference}, Color Palette: ${data.colorPalette}, Occasion: ${data.occasion}`;

      const result = await getPersonalizedStyleSuggestions({
        quizAnswers,
        photoDataUri,
        bodyTypeDescription: data.bodyTypeDescription,
      });

      setSuggestions(result);
      setStep(3);
    } catch (error) {
      console.error("Error getting style suggestions:", error);
      toast({
        title: "Oh no! Something went wrong.",
        description:
          "We couldn't generate your style suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRestart = () => {
    form.reset();
    setSuggestions(null);
    setPhotoPreview(null);
    setStep(1);
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="font-headline text-3xl">Let's Find Your Style</CardTitle>
              <CardDescription>
                This short quiz will help our AI understand your preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <FormField
                control={form.control}
                name="stylePreference"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-lg font-semibold">What's your go-to style?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 gap-4"
                      >
                        {["Minimalist", "Bohemian", "Classic", "Trendy", "Casual", "Vintage"].map(style => (
                             <FormItem key={style} className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                    <RadioGroupItem value={style} id={`style-${style}`} />
                                </FormControl>
                                <FormLabel htmlFor={`style-${style}`} className="font-normal">{style}</FormLabel>
                            </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="colorPalette"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-lg font-semibold">Which color palette do you prefer?</FormLabel>
                     <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 gap-4"
                      >
                        {["Neutrals", "Earthy Tones", "Pastels", "Bright & Bold"].map(palette => (
                             <FormItem key={palette} className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                    <RadioGroupItem value={palette} id={`color-${palette}`} />
                                </FormControl>
                                <FormLabel htmlFor={`color-${palette}`} className="font-normal">{palette}</FormLabel>
                            </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                control={form.control}
                name="occasion"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-lg font-semibold">What's the occasion?</FormLabel>
                     <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 gap-4"
                      >
                        {["Everyday Wear", "Work / Office", "Special Event", "Vacation"].map(occ => (
                             <FormItem key={occ} className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                    <RadioGroupItem value={occ} id={`occ-${occ}`} />
                                </FormControl>
                                <FormLabel htmlFor={`occ-${occ}`} className="font-normal">{occ}</FormLabel>
                            </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button onClick={() => form.trigger(["stylePreference", "colorPalette", "occasion"]).then(isValid => isValid && setStep(2))} size="lg" className="ml-auto">Next</Button>
            </CardFooter>
          </Card>
        );
      case 2:
        return (
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="self-start -ml-4"><ArrowLeft className="mr-2 h-4 w-4" />Back</Button>
              <CardTitle className="font-headline text-3xl">A Little More About You</CardTitle>
              <CardDescription>This helps us recommend the most flattering fits.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <FormField
                control={form.control}
                name="bodyTypeDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Describe your body type</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'I have an athletic build with broad shoulders and a defined waist. I prefer clothes that highlight my waist and aren't too tight on my arms.'"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                     <FormDescription>The more detail, the better the recommendation!</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                    control={form.control}
                    name="userPhoto"
                    render={({ field }) => (
                    <FormItem>
                         <FormLabel className="text-lg font-semibold">Upload a full-body photo</FormLabel>
                         <FormControl>
                            <div className="relative flex justify-center w-full px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    {photoPreview ? (
                                        <Image src={photoPreview} alt="Photo preview" width={150} height={200} className="mx-auto rounded-md object-cover" />
                                    ) : (
                                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                    )}
                                    <div className="flex text-sm text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative font-medium text-primary bg-transparent rounded-md cursor-pointer hover:text-primary/80 focus-within:outline-none"
                                        >
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="userPhoto" type="file" className="sr-only" accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if(file) {
                                                        field.onChange(file);
                                                        setPhotoPreview(URL.createObjectURL(file));
                                                    }
                                                }}
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </FormControl>
                        <FormDescription>For best results, use a clear, well-lit photo.</FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </CardContent>
            <CardFooter>
              <Button type="submit" size="lg" className="ml-auto" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Get My Style
              </Button>
            </CardFooter>
          </Card>
        );
      case 3:
        return (
          <Card className="max-w-3xl mx-auto animate-in fade-in-50">
            <CardHeader>
              <CardTitle className="font-headline text-3xl flex items-center gap-2"><Sparkles className="text-primary"/>Here Are Your Style Suggestions!</CardTitle>
              <CardDescription>
                Based on your preferences, here's a style profile we think you'll love.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="prose prose-lg max-w-none text-foreground">
                   {suggestions?.styleSuggestions.split('\n').map((paragraph, index) => (
                       <p key={index}>{paragraph}</p>
                   ))}
                </div>
            </CardContent>
            <CardFooter>
                 <Button onClick={handleRestart} size="lg" className="ml-auto">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Start Over
                </Button>
            </CardFooter>
          </Card>
        );
      default:
        return null;
    }
  };

  return <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        {renderStep()}
      </form>
    </Form>;
}
