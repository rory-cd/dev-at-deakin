"use client";

import RadioGroup from "@/components/form/RadioGroup";
import TextInput from "@/components/form/TextInput"
import { QuestionSchema } from "@/schemas/postSchemas";
import useForm from "@/hooks/useForm";
import TextAreaInput from "@/components/form/TextAreaInput";
import ButtonSecondary from "@/components/ButtonSecondary";
import FormLayoutBox from "@/components/form/FormLayoutBox";
import FormBackgroundBox from "@/components/form/FormBackgroundBox";
import TagInput from "@/components/form/TagInput";
import { postQuestion } from "@/libs/firebase";
import { useRouter } from 'next/navigation';
import LoadingIcon from "@/components/LoadingIcon";

export default function QuestionForm() {

  // Initial state
  const defaults = {
    type: "",
    title: "",
    description: "",
    tags: []
  };

  const router = useRouter();

  const onSubmit = async () => {
    try {
      // Post question to firebase
      const ref = await postQuestion(values.type, values.title, values.description, values.tags);
      router.push(`/questions/${ref.id}`);
    } catch (error) {
      setBackEndErrors("firebase", error.message);
      console.log(error.message);
    }
  };

  // Set form state
  const { values, errors, isSubmitting, handleInput, handleSubmit, setBackEndErrors } = useForm(
    defaults, QuestionSchema, onSubmit
  );

  const questionTypes = [
    { label: "Task related", value: "task-related" },
    { label: "General", value: "general" }
  ];

  return (
    <form onSubmit={handleSubmit} noValidate className={`${isSubmitting && "form-disabled"} relative`}>
      <FormBackgroundBox>
        <FormLayoutBox>
          <RadioGroup
            label="Question type"
            name="type"
            options={questionTypes}
            checkedValue={values.type}
            error={errors.type}
            onOptionChange={handleInput}
          />
        </FormLayoutBox>

        <FormLayoutBox>
          <TextInput
            label="Title"
            name="title"
            value={values.title}
            onTextChange={handleInput}
            error={errors.title}
            placeholder="Start your question with how, what, why, etc."
          />

          <TextAreaInput
            label="Description"
            name="description"
            height="20rem"
            value={values.description}
            onTextChange={handleInput}
            error={errors.description}
            placeholder="Describe your problem"
          />
        </FormLayoutBox>

        {/* TAGS */}
        <FormLayoutBox>
          <TagInput
            tags={values.tags}
            setTags={(newTags) => handleInput("tags", newTags)}
            placeholder={"Add tags to describe what your question is about"}
          />
        </FormLayoutBox>

        <ButtonSecondary type="submit" className="mt-5 m-auto px-15">
          Post
        </ButtonSecondary>
      </FormBackgroundBox>

      {isSubmitting && <LoadingIcon className="absolute inset-0 z-50" />}
    </form>
  );
}