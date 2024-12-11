export default function LanguageSelector({ value, onChange }) {
    return (
        <select
            className="bg-gray-800 text-white rounded-md px-3 py-1"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            {/* Popular Languages */}
            <optgroup label="Languages">
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="csharp">C#</option>
                <option value="c++">C++</option>
                <option value="rust">Rust</option>
                <option value="ruby">Ruby</option>
                <option value="php">PHP</option>
                <option value="go">Go</option>
                <option value="kotlin">Kotlin</option>
                <option value="swift">Swift</option>
            </optgroup>

            {/* Web Technologies */}
            <optgroup label="Web Technologies">
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="sass">Sass/SCSS</option>
            </optgroup>

            {/* Frameworks */}
            <optgroup label="Frameworks and Libraries">
                <option value="nodejs">Node.js</option>
                <option value="react">React</option>
                <option value="angular">Angular</option>
                <option value="vue">Vue</option>
                <option value="express">Express.js</option>
                <option value="django">Django</option>
                <option value="flask">Flask</option>
                <option value="spring">Spring Boot</option>
                <option value="nextjs">Next.js</option>
                <option value="nuxtjs">Nuxt.js</option>
            </optgroup>

            {/* Scripting */}
            <optgroup label="Scripting">
                <option value="bash">Bash</option>
                <option value="powershell">PowerShell</option>
            </optgroup>
        </select>
    );
}
