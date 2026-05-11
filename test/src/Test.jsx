import React from "react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { BasicButton , ActionButton , ConfirmButton , LinkButton , SubmitButton , BasicCarousel } from "ui-library-spj";
// import {BasicButton} from './components/buttons/BasicButton'
// import {ActionButton} from './components/buttons/ActionButton'
// import {ConfirmButton} from './components/buttons/ConfirmButton'
// import {LinkButton} from './components/buttons/LinkButton'
// import {SubmitButton} from './components/buttons/SubmitButton'
// import {BasicCarousel} from './components/carousel/BasicCarousel'

import "./index.css";
import SmartInput from "../../ui-library-package/components/SmartInputs/SmartInput";
import SmartFileDrop from "../../ui-library-package/components/SmartInputs/SmartFileDrop";

export default function App() {

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [resume, setResume] =
  useState(null);

const [images, setImages] =
  useState([]);
  const navigate = useNavigate();

  const carouselItems = [
    <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
      Slide One
    </div>,
    <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white text-3xl font-bold">
      Slide Two
    </div>,
    <div className="w-full h-full bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-center text-white text-3xl font-bold">
      Slide Three
    </div>,
  ];
  const [bio, setBio] =
  useState("");



const [role, setRole] =
  useState("frontend");

const [accepted, setAccepted] =
  useState(false);

const [gender, setGender] =
  useState("male");

const [file, setFile] =
  useState(null);

const [date, setDate] =
  useState("");
  return (
    <div className="max-w-5xl mx-auto p-10 space-y-16">
      {/* Page Header */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">UI Library Components</h1>
        <p className="text-gray-600">
          Intent-driven components focused on safety, clarity, and developer experience.
        </p>
      </header>

      {/* ================= BUTTONS ================= */}

      {/* BasicButton */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">BasicButton</h2>
          <p className="text-sm text-gray-600">
            General-purpose button for simple UI actions with no side effects.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <BasicButton onClick={() => alert("Clicked")}>
            Default
          </BasicButton>

          <BasicButton disabled>
            Disabled
          </BasicButton>

          <BasicButton className="bg-black hover:bg-gray-800">
            Custom Styled
          </BasicButton>
        </div>
      </section>

      {/* ActionButton */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">ActionButton</h2>
          <p className="text-sm text-gray-600">
            Executes async logic safely. Handles loading, prevents double execution,
            and centralizes error handling.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <ActionButton
            onAction={async () => {
              await new Promise((r) => setTimeout(r, 1000));
              alert("Saved successfully");
            }}
          >
            Save Data
          </ActionButton>

          <ActionButton
            onAction={async () => {
              throw new Error("Something went wrong");
            }}
            onError={(e) => alert(e.message)}
          >
            Error Example
          </ActionButton>

          <ActionButton
            onAction={async () => {
              await new Promise((r) => setTimeout(r, 3000));
              alert("Completed");
            }}
          >
            Long Running Action
          </ActionButton>
        </div>
      </section>

      {/* ConfirmButton */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">ConfirmButton</h2>
          <p className="text-sm text-gray-600">
            Built-in confirmation for destructive or irreversible actions.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <ConfirmButton
            onConfirm={() => alert("Item deleted")}
          >
            Delete Item
          </ConfirmButton>

          <ConfirmButton
            message="Click again to permanently delete"
            onConfirm={() => alert("Permanently deleted")}
          >
            Permanent Delete
          </ConfirmButton>
        </div>
      </section>

      {/* LinkButton */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">LinkButton</h2>
          <p className="text-sm text-gray-600">
            Semantic navigation component using anchors with optional controlled routing.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <LinkButton onNavigate={() => navigate("/profile")}>
            Go to Profile
          </LinkButton>

          <LinkButton href="https://example.com">
            External Link
          </LinkButton>
        </div>
      </section>

      {/* SubmitButton */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">SubmitButton</h2>
          <p className="text-sm text-gray-600">
            Form-aware submit button enforcing correct submit behavior.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Form submitted");
          }}
          className="flex flex-wrap gap-4"
        >
          <SubmitButton>
            Submit Form
          </SubmitButton>

          <SubmitButton loading>
            Submitting…
          </SubmitButton>
        </form>
      </section>

      {/* ================= CAROUSEL ================= */}

      {/* BasicCarousel */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">BasicCarousel</h2>
          <p className="text-sm text-gray-600">
            Lightweight carousel with internal state, smooth transitions,
            and zero external dependencies.
          </p>
        </div>

        <BasicCarousel
          items={carouselItems}
          className="rounded-2xl"
          slideClassName="shadow-2xl"
        />
      </section>
      <section className="py-10">
  <div className="max-w-md mx-auto p-6 space-y-5 bg-white rounded-3xl shadow-lg">

    {/* Email */}
    <SmartInput
      label="Email"
      placeholder="Enter email"
      value={email}
      onChange={setEmail}
      validation="email"
      required
    />

    {/* Phone */}
    <SmartInput
      label="Phone"
      placeholder="Enter phone"
      value={phone}
      onChange={setPhone}
      validation="phone"
    />

    {/* Password */}
    <SmartInput
      label="Password"
      type="password"
      placeholder="Enter password"
      value={password}
      onChange={setPassword}
      validation="password"
    />

    {/* Regex Username */}
    <SmartInput
      label="Username"
      placeholder="Only lowercase letters"
      value={username}
      onChange={setUsername}
      validation="regex"
      regex={/^[a-z]+$/}
    />

    {/* Textarea */}
    <SmartInput
      type="textarea"
      label="Bio"
      placeholder="Write about yourself..."
      value={bio}
      onChange={setBio}
      rows={4}
    />

    {/* Select */}
    <SmartInput
      type="select"
      label="Role"
      value={role}
      onChange={setRole}
      options={[
        {
          label: "Frontend Developer",
          value: "frontend",
        },
        {
          label: "Backend Developer",
          value: "backend",
        },
        {
          label: "Full Stack Developer",
          value: "fullstack",
        },
      ]}
    />

    {/* Checkbox */}
    <SmartInput
      type="checkbox"
      placeholder="Accept Terms & Conditions"
      checked={accepted}
      onChange={setAccepted}
    />

    {/* Radio */}
    <div className="space-y-3">
      <p className="font-medium">
        Gender
      </p>

      <SmartInput
        type="radio"
        placeholder="Male"
        checked={gender === "male"}
        radioValue="male"
        onChange={setGender}
      />

      <SmartInput
        type="radio"
        placeholder="Female"
        checked={gender === "female"}
        radioValue="female"
        onChange={setGender}
      />
    </div>

    {/* File Upload */}
    <SmartInput
      type="file"
      label="Upload Resume"
      onChange={setFile}
    />

    {/* Date */}
    <SmartInput
      type="date"
      label="Date of Birth"
      value={date}
      onChange={setDate}
    />

    {/* Submit */}
    <SmartInput
      type="submit"
      buttonText="Create Account"
      inputClassName="
        w-full
        bg-black
        hover:bg-zinc-800
      "
    />

  </div>
</section>
      <section className="p-8 space-y-8 bg-zinc-50 rounded-2xl mt-8">
        <h2 className="text-2xl font-bold">Smart File Drop Tests</h2>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Single File Upload</h3>
          <SmartFileDrop
            onChange={setResume}
          />
          {resume && <p className="mt-2 text-sm text-green-600">Selected file: {resume[0]?.name}</p>}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Multiple File Upload</h3>
          <SmartFileDrop
            onChange={setImages}
            multiple={true}
          />
          {images && images.length > 0 && (
            <p className="mt-2 text-sm text-green-600">
              Selected files: {images.map(f => f.name).join(', ')}
            </p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Fully Customized Upload</h3>
          <SmartFileDrop
            onChange={setResume}
            multiple={true}
            title="Upload Portfolio Assets"
            subtitle="Drop your high-res videos, images, or PDFs here"
            actionText="Select Assets"
            containerClassName="!bg-zinc-900 !rounded-3xl"
            icon={
              <svg 
                className="upload-icon !text-zinc-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" 
                />
              </svg>
            }
          />
          <style>{`
            /* Overriding internal styles just for this instance */
            .smart-file-drop-container.\\!bg-zinc-900 .smart-file-drop-zone {
              background-color: #18181b;
              border-color: #3f3f46;
            }
            .smart-file-drop-container.\\!bg-zinc-900 .smart-file-drop-title {
              color: #f4f4f5;
            }
            .smart-file-drop-container.\\!bg-zinc-900 .smart-file-drop-subtitle {
              color: #a1a1aa;
            }
            .smart-file-drop-container.\\!bg-zinc-900 .smart-file-drop-action {
              background: #27272a;
              color: #f4f4f5;
              border-color: #3f3f46;
            }
            .smart-file-drop-container.\\!bg-zinc-900 .smart-file-drop-zone:hover {
              border-color: #f4f4f5;
              background-color: #27272a;
            }
            .smart-file-drop-container.\\!bg-zinc-900 .smart-file-drop-zone:hover .smart-file-drop-action {
              background: #f4f4f5;
              color: #18181b;
            }
            .smart-file-drop-container.\\!bg-zinc-900 .smart-file-drop-zone.dragging {
              border-color: #10b981;
              background-color: #064e3b;
              box-shadow: inset 0 0 20px rgba(16, 185, 129, 0.2);
            }
            .smart-file-drop-container.\\!bg-zinc-900 .smart-file-drop-zone.dragging .upload-icon {
              color: #34d399;
            }
          `}</style>
        </div>
      </section>
    </div>
  );
}
