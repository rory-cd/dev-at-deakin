"use client";

import useForm from "@/hooks/useForm";
import FormLabel from "@/components/form/FormLabel";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from 'lowlight'
import UploadImageBox from "@/components/UploadImageBox";
import { postArticle } from "@/libs/firebase";
import { useEditor } from "@tiptap/react";
import ArticleEditor from "@/components/tiptap/ArticleEditor";
import { Placeholder } from '@tiptap/extensions';
import StarterKit from '@tiptap/starter-kit';
import TextInput from "@/components/form/TextInput"
import TextAreaInput from "@/components/form/TextAreaInput";
import TagInput from "@/components/form/TagInput";
import ButtonSecondary from "@/components/ButtonSecondary";
import FormLayoutBox from "@/components/form/FormLayoutBox";
import FormBackgroundBox from "@/components/form/FormBackgroundBox";
import { useRouter } from 'next/navigation';
import LoadingIcon from "@/components/LoadingIcon";
import { ArticleSchema } from "@/schemas/postSchemas";
import FormErrorMessage from "./FormErrorMessage";
import Youtube from '@tiptap/extension-youtube'

export default function ArticleForm() {

  // Initial state
  const defaults = {
    title: "",
    abstract: "",
    content: "",
    tags: [],
    imgUrl: ""
  };

  const router = useRouter();

  // Tiptap editor
  const lowlight = createLowlight(common)
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,         // Disable default
      }),
      Placeholder.configure({
        placeholder: 'Write your tutorial here...'
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Youtube.configure({
        controls: true,
        nocookie: true,
      }),
    ],
    content: '',                  // Initial content (type html here)
    immediatelyRender: false,     // Don't render immediately on the server to avoid SSR issues
    onUpdate({editor}) {
      const json = editor.getJSON();
      handleInput("content", JSON.stringify(json));
    }
  });

  const onSubmit = async () => {
    try {
      // Post the article to firebase
      const ref = await postArticle(values.title, values.abstract, values.content, values.tags, values.imgUrl);
      router.push(`/articles/${ref.id}`);
    } catch (error) {
      setBackEndErrors("firebase", error.message);
      console.log(error.message);
    }
  };

  // Set form state
  const { values, errors, isSubmitting, handleInput, handleSubmit, setBackEndErrors } = useForm(
    defaults, ArticleSchema, onSubmit
  );

  return (
    <form onSubmit={handleSubmit} noValidate className={`${isSubmitting && "form-disabled"} relative`}>
      <FormBackgroundBox>
        <FormLayoutBox>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
            
            {/* MAIN INPUTS */}
            <div className="flex flex-col flex-1 gap-6">
              <TextInput
                label="Title"
                name="title"
                value={values.title}
                onTextChange={handleInput}
                error={errors.title}
                placeholder="Enter a descriptive title"
              />

              <TextAreaInput
                label="Abstract"
                name="abstract"
                height="5rem"
                value={values.abstract}
                onTextChange={handleInput}
                error={errors.abstract}
                placeholder="Enter a single paragraph abstract"
              />
            </div>
            <UploadImageBox
              folder="articles"
              className="w-50 lg:w-auto"
              afterUpload={handleInput}
              error={errors.imgUrl}
              msg="Add article image"
            />
          </div>

          {/* TIPTAP INPUT */}
          <div>
            <FormLabel className="mb-4">
              Content
            </FormLabel>
            <ArticleEditor editor={editor} />
            {errors?.content && <FormErrorMessage error={errors.content} />}
          </div>
        </FormLayoutBox>

        {/* TAGS */}
        <FormLayoutBox>
          <TagInput
            tags={values.tags}
            setTags={(newTags) => handleInput("tags", newTags)}
            placeholder={"Add tags to describe what your article is about"}
          />
        </FormLayoutBox>

        {/* SUBMISSION */}
        <ButtonSecondary type="submit" className="mt-5 m-auto px-15">
          Post
        </ButtonSecondary>
      </FormBackgroundBox>

      {isSubmitting && <LoadingIcon className="absolute inset-0 z-50" />}
    </form>
  );
}