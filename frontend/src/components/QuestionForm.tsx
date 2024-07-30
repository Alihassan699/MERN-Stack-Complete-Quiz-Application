import React, { useState } from 'react';

function QuestionForm() {
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''], 
    correctOption: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('option')) {
      const index = parseInt(name.split('_')[1], 10);
      const updatedOptions = [...formData.options];
      updatedOptions[index] = value;
      setFormData({
        ...formData,
        options: updatedOptions
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      question: formData.question,
      options: formData.options,
      correctOption: formData.correctOption
    };

    try {
      const response = await fetch('http://localhost:3000/apis/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('Question submitted successfully');
        setFormData({
          question: '',
          options: ['', '', '', ''],
          correctOption: ''
        });
      } else {
        alert('Failed to submit the question');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('An error occurred while submitting the question');
    }
  };

  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="question"
          id="question"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          value={formData.question}
          onChange={handleChange}
        />
        <label
          htmlFor="question"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Question
        </label>
      </div>

      {formData.options.map((option, index) => (
        <div key={index} className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name={`option_${index}`}
            id={`option_${index}`}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={option}
            onChange={handleChange}
          />
          <label
            htmlFor={`option_${index}`}
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Option {index + 1}
          </label>
        </div>
      ))}

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="correctOption"
          id="correctOption"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          value={formData.correctOption}
          onChange={handleChange}
        />
        <label
          htmlFor="correctOption"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Correct Option
        </label>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
}

export default QuestionForm;